var db = require('./db');
var ModelModule = require('./model');
var licenseTable = "license_apply_price";
var enrollmentTable = "enrollment";
var transferTable = "transfer_request";
var branchTable = "branch";
var courseTable = "course";
var carTable = "vehicle";
var activityTable = "activity";
var instructorTable = "instructor";

var Reports = {};
Reports = Object.create(ModelModule);
Reports.table = "account";
Reports.db = db;

var Student = {};
Student = Object.create(ModelModule);
Student.table = "student";
Student.infoTable = "userinfo";
Student.db = db;

var PreRegister = {};
PreRegister = Object.create(ModelModule);
PreRegister.table = "preRegStudent";
PreRegister.db = db;

var Enroll = {};
Enroll = Object.create(ModelModule);
Enroll.table = "enrollment";
Enroll.db = db;

var Transfer = {};
Transfer = Object.create(ModelModule);
Transfer.table = "transfer_request";
Transfer.db = db;

var Evaluation = {};
Evaluation = Object.create(ModelModule);
Evaluation.table = "evaluation";
Evaluation.db = db;

var Schedule = {};
Schedule = Object.create(ModelModule);
Schedule.table = "schedule";
Schedule.db = db;

//STUDENTS
Reports.enrollee = function(query, cb){
    return new Promise((resolve, reject)=>{
        var freq = query.freq;
        if(!freq || !Date.parse(query.date)) return cb(null, false, query);
        
        var branch = query.branch;
        var date = query.date;

        getFreqDate(freq, date).then(dateScope=>{
            var data = {
                dateStart: dateScope[0],
                dateEnd: dateScope[1],
                total: {
                    count: 0,
                    reject: 0,
                },
                record: [],
            }
            return getEnrolled(dateScope, branch).then(results=>{
                data.record = results;
                if(results.length == 0) return data;
                return new Promise((res,rej)=>{
                    results.forEach((e,i)=>{
                        data.total.count += 1;
                        if(e.status == 3) data.total.reject += 1;
                        if(i==results.length-1){
                            res(data);
                        }
                    });
                });
            });
        }).then(data=>{ // Get Branch
            if(!branch){
                data.branch = "All Branch";
                return data;
            }else{
                return getBranch(branch).then(branchData=>{
                    data.branch = branchData.name;
                    return data;
                });
            }
        }).then(data=>{ // Get Branch per record
            if(data.record.length == 0) return data;
            return new Promise((res,rej)=>{
                var promises = [];
                data.record.forEach((e,i)=>{
                    promises.push(getBranch(e.data.branch).then(branchData=>{
                        data.record[i].data.branch = branchData.name;
                        return true;
                    }));
                    data.record[i].dateSubmit = Date.parse(data.record[i].dateSubmit).toString('MM-dd-yyyy');
                    if(i==data.record.length-1){
                        Promise.all(promises).then(()=>{
                            res(data);
                        });
                    }
                });
            });
        }).then(data=>{
            if(data.record.length == 0) return data;
            return new Promise((res, rej)=>{
                var promises = [];
                data.record.forEach((e,i)=>{
                    e.data.courseName = [];
                    e.data.course.forEach((e1,i1)=>{
                        promises.push(new Promise((res1,rej1)=>{
                            getCourseName(e1).then(name=>{
                                var special = e.data.special.course.indexOf(e1) == -1 ? "No" : "Yes";
                                e.data.courseName.push({id: e1, name: name, special: special});
                                res1();
                            });
                        }));
                    });
                    if(i==data.record.length-1){
                        Promise.all(promises).then(()=>{
                            res(data);
                        });
                    }
                });
            });
        }).then(output=>{ // Output
            if(cb){
                cb(null,output); 
            }else{
                finish(output);
            }
        }).catch(reason=>{
            throw new Error(reason.stack);
        }).catch(reason=>{
            if(cb){
                cb(reason);
            }else{
                fail(reason);
            }
        });
    });
}

Reports.transferee = function(query, cb){
    return new Promise((resolve, reject)=>{
        var freq = query.freq;
        if(!freq || !Date.parse(query.date)) return cb(null, false, query);
        var date = query.date;

        getFreqDate(freq, date).then(dateScope=>{
            return new Promise((res, rej)=>{
                var sql = "SELECT * FROM " + transferTable + " WHERE effectiveDate BETWEEN ? AND ? AND status = 4";
                db.get().query(sql, dateScope, function(err, results){
                    if(err) return rej(err);
                    res({
                        dateStart: dateScope[0],
                        dateEnd: dateScope[1],
                        record: results
                    });
                });
            });
        }).then(data=>{
            var total = {
                from: {},
                to: {}
            }
            data.total = total;
            if(data.record.length == 0) return data;
            return new Promise((res, rej)=>{
                var promises = [];
                data.record.forEach((e,i)=>{
                    promises.push(getBranch(e.to_branchID).then(branchData=>{
                        data.record[i].to_branch = branchData.name;
                    }));
                    promises.push(getBranch(e.from_branchID).then(branchData=>{
                        data.record[i].from_branch = branchData.name;
                    }));
                    promises.push(getStudent(e.studID).then(student=>{
                        data.record[i].studentName = student.fullname;
                    }));

                    data.record[i].effectiveDate = Date.parse(data.record[i].effectiveDate).toString('MM-dd-yyyy');
                    data.record[i].request_date = Date.parse(data.record[i].request_date).toString('MM-dd-yyyy');
                    total.from[e.from_branchID] = (total.from[e.from_branchID] == undefined ? 1 : total.from[e.from_branchID]++);
                    total.to[e.to_branchID] = (total.to[e.to_branchID] == undefined ? 1 : total.to[e.to_branchID]++);

                    if(i==data.record.length-1){
                        Promise.all(promises).then(()=>{
                            data.total = total;
                            res(data);
                        }).catch(rej);
                    }
                });
            });
        }).then(data=>{
            return getBranch().then(branchData=>{
                return new Promise((res,rej)=>{
                    var branches = [];
                    branchData.forEach((e,i)=>{
                        var datum = {
                            id: e.id,
                            name: e.name,
                            to: data.total.to[e.id] || 0,
                            from: data.total.from[e.id] || 0,
                        }
                        if(datum.to || datum.from){
                            branches.push(datum);
                        }
                        if(i==branchData.length-1){
                            data.total = branches;
                            res(data);
                        }
                    });
                });
            });
        }).then(output=>{ // Output
            if(cb){
                cb(null,output); 
            }else{
                finish(output);
            }
        }).catch(reason=>{
            throw new Error(reason.stack);
        }).catch(reason=>{
            if(cb){
                cb(reason);
            }else{
                fail(reason);
            }
        });
    });
}

Reports.evaluation = function(query, cb){
    return new Promise((resolve, reject)=>{
        if(!cb) cb = (e,a)=>{ // BOTH IMPLEMENTATION OF CALLBACK AND PROMISE
            if(e) return reject(e);
            resolve(a);
        };

        var branch = query.branch;
        var freq = query.freq;
        if(!freq || !Date.parse(query.date)) return cb(null, false, query);
        var date = query.date;

        getFreqDate(freq,date).then(dateScope=>{
            return new Promise((res, rej)=>{
                var sql = "SELECT e.*, s.branch FROM " + Evaluation.table + " e, "+ Student.table +" s WHERE s.id = e.studID AND e.target = 1 AND e.dateEvaluated BETWEEN ? AND ?"; 
                if(branch){
                    sql += " AND s.branch = ?";
                    dateScope.push(branch);
                }
                
                db.get().query(sql, dateScope, function(err, results){
                    if(err) return rej(err);
                    res(results);
                });
            }).then(evaluations=>{
                var out = {
                    dateStart: dateScope[0],
                    dateEnd: dateScope[1],
                    records: evaluations,
                };
                return out;
            });
        }).then(evaluation=>{
            if(evaluation.records.length == 0) return evaluation;
            return new Promise((res, rej)=>{
                evaluation.total = {
                    highest: 0,
                    lowest: 100,
                    average: 0
                }

                var total = 0;
                var promises = [];
                evaluation.records.forEach((e,i)=>{
                    promises.push(getStudent(e.studID).then(stud=>{
                        evaluation.records[i].studentName = stud.fullname;
                        return 1;
                    }));
                    promises.push(getInstructor(e.instID).then(inst=>{
                        evaluation.records[i].instructorName = inst.fullname;
                        return 1;
                    }));
                    promises.push(getBranch(e.branch).then(branchData=>{
                        evaluation.records[i].branchName = branchData.name;
                        return 1;
                    }));
                    promises.push(getCourseName(e.courseID).then(course=>{
                        evaluation.records[i].course = course;
                        return 1;
                    }));

                    var grade = (e.grade);
                    var percent = grade * 2;
                    evaluation.records[i].grade = grade + "/50 (" + percent+ "%)";
                    evaluation.records[i].evaluation = percent > 70 ? "Passed" : "Failed";

                    evaluation.total.highest = evaluation.total.highest < percent ? percent : evaluation.total.highest;
                    evaluation.total.lowest = evaluation.total.lowest > percent ? percent : evaluation.total.lowest;
                    total += percent;

                    if(i==evaluation.records.length-1){
                        Promise.all(promises).then(()=>{
                            evaluation.total.average = total / evaluation.records.length;
                            evaluation.total.lowest = evaluation.total.lowest == 100 ? 0 : evaluation.total.lowest;
                            res(evaluation);
                        }).catch(rej);
                    }
                });

                if(branch){
                    promises.push(getBranch(branch).then(branch=>{
                        evaluation.branch = branch.name;
                        return 1;
                    }));
                }
            });
        }).then(output=>{ // Output
            cb(null, output);
        }).catch(reason=>{
            throw new Error(reason.stack);
        }).catch(reason=>{
            cb(reason);
        });    
    });
}

//INSTRUCTORS
Reports.performance = function(query, cb){
    return new Promise((resolve,reject)=>{
        if(!cb) cb = (e,a)=>{ // BOTH IMPLEMENTATION OF CALLBACK AND PROMISE
            if(e) return reject(e);
            resolve(a);
        };
        var freq = query.freq;
        if(!freq || !Date.parse(query.date)) return cb(null, false, query);
        var date = query.date;

        getFreqDate(freq, date).then(dateScope=>{
            return new Promise((res,rej)=>{
                var sql = "SELECT instID, COUNT(*) as 'students' FROM " + Evaluation.table + " WHERE target = 0 AND dateEvaluated BETWEEN ? AND ? GROUP BY instID";
                db.get().query(sql, dateScope, function(err,result){
                    if(err) return rej(err);
                    res(result);
                });
            }).then(data=>{
                return {
                    dateStart: dateScope[0],
                    dateEnd: dateScope[1],
                    records: data,
                }
            });
        }).then(data=>{
            if(data.records.length == 0) return data;
            return new Promise((res, rej)=>{
                var promises = [];
                data.records.forEach((e,i)=>{
                    promises.push(getInstructor(e.instID).then(inst=>{
                        data.records[i].instructorName = inst.fullname;
                        return 1;
                    }));
                    promises.push(new Promise((res1, rej1)=>{
                        var sql = "SELECT grade FROM " + Evaluation.table + " WHERE target = 0 AND instID = ? AND dateEvaluated BETWEEN ? AND ?";
                        db.get().query(sql, [e.instID, data.dateStart, data.dateEnd], function(err,result){
                            if(err) return rej1(err);
                            var total = 0;
                            result.forEach((elememt,index)=>{
                                total += elememt.grade;
                                if(index == result.length-1){
                                    data.records[i].evaluation = (total/result.length) * 10;
                                    data.records[i].grade = data.records[i].evaluation * 2;
                                    res1(1);
                                }
                            });
                        });
                    }));
                    if(i == data.records.length-1){
                        Promise.all(promises).then(()=>{
                            res(data);
                        }).catch(rej);
                    }
                });      
            });
        }).then(data=>{
            if(data.records.length == 0) return data;
            return new Promise((res, rej)=>{
                var total = 0;
                data.total = {
                    highest: 0,
                    lowest: 100,
                    average: 0,
                }
                data.records.forEach((e,i)=>{
                    total += e.grade;
                    data.total.highest = data.total.highest < e.grade ? e.grade : data.total.highest;
                    data.total.lowest = data.total.lowest > e.grade ? e.grade : data.total.lowest;
                    if(i==data.records.length-1){
                        data.total.lowest = data.total.lowest == 100 ? 0 : data.total.lowest;
                        data.total.average = total / data.records.length;
                        res(data);
                    }
                });
            });
        }).then(output=>{ // Output
            cb(null, output);
        }).catch(reason=>{
            throw new Error(reason.stack);
        }).catch(reason=>{
            cb(reason);
        }); 
    });   
}

Reports.instructorList = function(cb){
    return new Promise((resolve,reject)=>{
        if(!cb) cb = (e,a)=>{ 
            if(e) return reject(e);
            resolve(a);
        };

        getInstructor().then(instructors=>{
            if(instructors.length == 0) return resolve(instructors);
            var promises = [];
            instructors.forEach((e,i)=>{
                promises.push(getCarOfInst(e.instID).then(car=>{
                    instructors[i].car = car ? car.plate : "";
                    return 1;
                }));
                instructors[i].dateRegistered = Date.parse(instructors[i].dateRegistered).toString("MMM dd, yyyy");
                instructors[i].dateRetired = instructors[i].dateRetired ? Date.parse(instructors[i].dateRetired).toString("MMM dd, yyyy") : "-----";
                if(i==instructors.length-1){
                    Promise.all(promises).then(a=>{
                        cb(null,instructors);
                    }).catch(reason=>{
                        throw reason;
                    });
                }
            });
        }).catch(reason=>{
            throw new Error(reason.stack);
        }).catch(cb);
    });
}

//GROSS INCOME
Reports.tuition = function(query, cb){
    return new Promise((finish, fail)=>{
        var freq = query.freq;
        if(!freq || !Date.parse(query.date)) return cb(null, false, query);
        
        var branch = query.branch;
        var date = query.date;
        
        getFreqDate(freq, date).then(dateScope=>{
            return Promise.all([getEnrolled(dateScope, branch),getPaidTransactions(dateScope,'Enrollment', branch)]).then(results=>{
                return {
                    //enrollee: results[0],
                    transaction: results[1],
                    dateStart: dateScope[0],
                    dateEnd: dateScope[1],
                } 
            });
        }).then(data=>{
            return new Promise((resolve, reject)=>{
                var total  = {
                    amount: 0,
                    payment: 0,
                    balance: 0,
                }
                if(data.transaction.length == 0){
                    data.total = total;
                    return resolve(data);
                } 
                var promises = [];
                data.transaction.forEach((e,i)=>{
                    promises.push(getLicensePrice(e.data.apply).then(price=>{
                        var tuition = e.price - price;
                        var balance = e.balance;
                        var payment = e.price - balance;
    
                        data.transaction[i].price = tuition;
                        data.transaction[i].balance = balance;
                        data.transaction[i].payment = payment;
    
                        total.amount += tuition;
                        total.payment += payment >= tuition ? tuition : payment;
                        total.balance += balance;
                        return true;
                    }));
                    if(i==data.transaction.length-1){
                        Promise.all(promises).then(()=>{
                            data.total = total;
                            resolve(data);
                        });
                    }
                });
            });
        }).then(data=>{
            return new Promise((resolve, reject)=>{
                if(data.transaction.length == 0) return resolve(data);            
                var promises = [];
                data.transaction.forEach((e,i)=>{
                    promises.push(getStudentViaORnum(e.ORno).then(student=>{
                        if(!student) return null;
                        var pad = "000";
                        return {
                            ORno: e.ORno,
                            fullname: student.fullname,
                            course: "CRS-" + student.carType.toUpperCase() + (pad.substring(0,pad.length-student.courseID.length) + student.courseID),
                            branch: student.branch,
                            amount: e.price,
                            payment: e.payment,
                            balance: e.balance
                        }
                    }));
                    if(i==data.transaction.length-1){
                        return Promise.all(promises).then(done=>{
                            done.forEach((x,i)=>{
                                if(!x) done.splice(i,1);
                            });
                            data.transaction = done;
                            resolve(data);
                        }).catch(reject);
                    }
                });
            });
        }).then(output=>{
            if(cb){
                cb(null,output); 
            }else{
                finish(output);
            }
        }).catch(reason=>{
            throw new Error(reason.stack);
        }).catch(reason=>{
            if(cb){
                cb(reason);
            }else{
                fail(reason);
            }
        });
    });
}

Reports.balance = function(query, cb){
    return new Promise((finish, fail)=>{
        var freq = query.freq;
        if(!freq || !Date.parse(query.date)) return cb(null, false, query);
        
        var branch = query.branch;
        var date = query.date;
        
        getFreqDate(freq, date).then(dateScope=>{
            return getUnpaidTransactions(dateScope,null, branch).then(res=>{
                return {
                    dateStart: dateScope[0],
                    dateEnd: dateScope[1],
                    records: res,
                }
            });
        }).then(data=>{
            if(data.records.length == 0) return data;1111
        }).then(output=>{
            if(cb){
                cb(null,output); 
            }else{
                finish(output);
            }
        }).catch(reason=>{
            throw new Error(reason.stack);
        }).catch(reason=>{
            if(cb){
                cb(reason);
            }else{
                fail(reason);
            }
        });
    });
}

Reports.certificate = function(query, cb){
    return new Promise((finish, fail)=>{
        var freq = query.freq;
        if(!freq || !Date.parse(query.date)) return cb(null, false, query);
        
        var branch = query.branch;
        var date = query.date;
        
        getFreqDate(freq, date).then(dateScope=>{
            return Promise.all([getEnrolled(dateScope, branch),getPaidTransactions(dateScope,'Certificate', branch)]).then(results=>{
                return {
                    //enrollee: results[0],
                    transaction: results[1],
                    dateStart: dateScope[0],
                    dateEnd: dateScope[1],
                } 
            });
        }).then(data=>{
            return new Promise((resolve, reject)=>{
                var total  = {
                    amount: 0,
                    payment: 0,
                    balance: 0,
                }
                if(data.transaction.length == 0){
                    data.total = total;
                    return resolve(data);
                } 
                data.transaction.forEach((e,i)=>{
                    var price = e.price;
                    var balance = e.balance;
                    var payment = price - balance;
    
                    data.transaction[i].price = price;
                    data.transaction[i].balance = balance;
                    data.transaction[i].payment = payment;
    
                    total.amount += price;
                    total.payment += payment;
                    total.balance += balance;
    
                    if(i==data.transaction.length-1){
                        data.total = total;
                        resolve(data);
                    }
                });
            });
        }).then(data=>{
            return new Promise((resolve, reject)=>{
                if(data.transaction.length == 0) return resolve(data);            
                var promises = [];
                data.transaction.forEach((e,i)=>{
                    promises.push(getStudentViaORnum(e.ORno).then(student=>{
                        var pad = "000";
                        return {
                            ORno: e.ORno,
                            studID: student.id,
                            fullname: student.fullname,
                            course: "CRS-" + student.carType.toUpperCase() + (pad.substring(0,pad.length-student.courseID.length) + student.courseID),
                            branch: student.branch,
                            amount: e.price,
                            payment: e.payment,
                            balance: e.balance
                        }
                    }));
                    if(i==data.transaction.length-1){
                        return Promise.all(promises).then(done=>{
                            data.transaction = done;
                            resolve(data);
                        }).catch(reject);
                    }
                });
            });
        }).then(output=>{
            if(cb){
                cb(null,output); 
            }else{
                finish(output);
            }
        }).catch(reason=>{
            throw new Error(reason.stack);
        }).catch(reason=>{
            if(cb){
                cb(reason);
            }else{
                fail(reason);
            }
        });
    });
}

Reports.license = function(query, cb){
    return new Promise((finish, fail)=>{
        var freq = query.freq;
        if(!freq || !Date.parse(query.date)) return cb(null, false, query);
        
        var branch = query.branch;
        var date = query.date;
        
        getFreqDate(freq, date).then(dateScope=>{
            return getPaidTransactions(dateScope, 'Apply', branch).then(data=>{
                return {
                    transaction: data,
                    dateStart: dateScope[0],
                    dateEnd: dateScope[1],
                }
            });
        }).then(data=>{
            return new Promise((resolve, reject)=>{
                var total  = {
                    amount: 0,
                    payment: 0,
                    balance: 0,
                }
                if(data.transaction.length == 0){
                    data.total = total;
                    return resolve(data);
                } 
                var promises = [];
                data.transaction.forEach((e,i)=>{
                    promises.push(getLicensePrice(e.data.apply, true).then(license=>{
                        var tuition = e.price - license.price;
                        var payment = e.price - e.balance;
                        var balance = 0;
    
                        payment = payment >= tuition ? payment - tuition : 0;
                        balance = license.price - payment;
                        
                        data.transaction[i].license = license.desc;
                        data.transaction[i].price = license.price;
                        data.transaction[i].balance = balance;
                        data.transaction[i].payment = payment;
        
                        total.amount += license.price;
                        total.payment += payment;
                        total.balance += balance;
                        return true;
                    }));
                    if(i==data.transaction.length-1){
                        Promise.all(promises).then(()=>{
                            data.total = total;
                            resolve(data);
                        });
                    }
                });
            });
        }).then(data=>{
            return new Promise((resolve, reject)=>{
                if(data.transaction.length == 0) return resolve(data);            
                var promises = [];
                data.transaction.forEach((e,i)=>{
                    promises.push(getStudentViaORnum(e.ORno).then(student=>{
                        var pad = "000";
                        return {
                            fullname: student.fullname,
                            course: "CRS-" + student.carType.toUpperCase() + (pad.substring(0,pad.length-student.courseID.length) + student.courseID),
                            branch: student.branch,
                            amount: e.price,
                            payment: e.payment,
                            balance: e.balance,
                            license: e.license,
                            ORno: e.ORno,
                            date: Date.parse(e.date).toString('MM-dd-yyyy'),
                        }
                    }));
                    if(i==data.transaction.length-1){
                        return Promise.all(promises).then(done=>{
                            data.transaction = done;
                            resolve(data);
                        }).catch(reject);
                    }
                });
            });
        }).then(output=>{
            if(cb){
                cb(null,output); 
            }else{
                finish(output);
            }
        }).catch(reason=>{
            throw new Error(reason.stack);
        }).catch(reason=>{
            if(cb){
                cb(reason);
            }else{
                fail(reason);
            }
        });
    });
}

Reports.overall = function(query, cb){
    return new Promise((done, fail)=>{
        var freq = query.freq;
        if(!freq || !Date.parse(query.date)) return cb(null, false, query);
    
        var branchePromise = getBranch();
        var getDateScope = getFreqDate(freq, query.date);

        // --------- Tuition
        var t1 = branchePromise.then(branchs=>{
            return new Promise((resolve, reject)=>{
                var prom = [];
                var total = {
                    amount: 0,
                    payment: 0,
                    balance: 0,
                }
                branchs.forEach((e,i)=>{
                    prom.push(new Promise((ok, not)=>{
                        this.tuition({freq: freq, date: query.date, branch: e.id}).then(data=>{
                            var output = {
                                branch: e,
                                total: data.total,
                            }
                            total.amount += output.total.amount;
                            total.payment += output.total.payment;
                            total.balance += output.total.balance;
                            return output;
                        }).then(data=>{
                            ok(data);
                        }).catch(not);
                    }));
                    if(i==branchs.length-1){
                        Promise.all(prom).then(data=>{
                            resolve({
                                transaction: data,
                                total: total,
                            });
                        }).catch(reject);
                    }
                });
            });
        });

        // --------- Certificate
        var t2 = branchePromise.then(branchs=>{
            return new Promise((resolve, reject)=>{
                var prom = [];
                var total = {
                    amount: 0,
                    payment: 0,
                    balance: 0,
                }
                branchs.forEach((e,i)=>{
                    prom.push(new Promise((ok, not)=>{
                        this.certificate({freq: freq, date: query.date, branch: e.id}).then(data=>{
                            var output = {
                                branch: e,
                                total: data.total,
                            }
                            total.amount += output.total.amount;
                            total.payment += output.total.payment;
                            total.balance += output.total.balance;
                            return output;
                        }).then(data=>{
                            ok(data);
                        }).catch(not);
                    }));
                    if(i==branchs.length-1){
                        Promise.all(prom).then(data=>{
                            resolve({
                                transaction: data,
                                total: total,
                            });
                        }).catch(reject);
                    }
                });
            });
        });

        // --------- License
        var t3 = branchePromise.then(branchs=>{
            return new Promise((resolve, reject)=>{
                var prom = [];
                var total = {
                    amount: 0,
                    payment: 0,
                    balance: 0,
                }
                branchs.forEach((e,i)=>{
                    prom.push(new Promise((ok, not)=>{
                        this.license({freq: freq, date: query.date, branch: e.id}).then(data=>{
                            var output = {
                                branch: e,
                                total: data.total,
                            }
                            total.amount += output.total.amount;
                            total.payment += output.total.payment;
                            total.balance += output.total.balance;
                            return output;
                        }).then(data=>{
                            ok(data);
                        }).catch(not);
                    }));
                    if(i==branchs.length-1){
                        Promise.all(prom).then(data=>{
                            resolve({
                                transaction: data,
                                total: total,
                            });
                        }).catch(reject);
                    }
                });
            });
        });

        Promise.all([t1,t2,t3]).then(results=>{
            return new Promise((resolve)=>{
                var total = {
                    amount: 0,
                    income: 0,
                    balance: 0,
                };
                results.forEach((e,i)=>{
                    total.amount += e.total.amount;
                    total.balance += e.total.balance;
                    total.income += (e.total.amount - e.total.balance);
                    if(i==results.length-1){
                        resolve({
                            tuition: results[0],
                            certificate: results[1],
                            license: results[2],
            
                            total: {
                                amount: total.amount,
                                income: total.income,
                                balance: total.balance,
                            }
                        });
                    }
                });
            });
        }).then(data=>{
            return getDateScope.then(dateScope=>{
                data.dateStart = dateScope[0];
                data.dateEnd = dateScope[1];
                return data;
            });
        }).then(data=>{
            if(cb){
                cb(null, data);
            }else{
                done(data);
            }
        }).catch(reason=>{
            throw new Error(reason.stack);
        }).catch(reason=>{
            if(cb){
                cb(reason);
            }else{
                fail(data);
            }
        });
    });
}

//Vehicle
Reports.carList = function(cb){
    return new Promise((resolve, reject)=>{
        if(!cb){
            cb = (err,done)=>{
                if(err) return reject(err);
                resolve(done);
            }
        }

        var sql = "SELECT * FROM " + carTable + " ORDER BY plate ASC";
        db.get().query(sql, function(err, results){
            if(err) return cb(err);
            if(results.length == 0) return cb(null,results);
            var promises = [];
            results.forEach((e,i)=>{
                promises.push(getInstructor(e.driver || "").then(instructor=>{
                    results[i].driver = instructor ? instructor.fullname : "";
                    return 1;
                }));
                if(i==results.length-1){
                    Promise.all(promises).then(a=>{
                        cb(null, results)
                    });
                }
            });
        });
    });
}

Reports.activity = function(query, cb){
    return new Promise((done,fail)=>{
        if(!cb) cb = (e,a)=>{
            if(e) return fail(e);
            done(a);
        };

        var freq = query.freq;
        var date = query.date;
        var branch = query.branch;
        var carID = query.plate;
        if(!freq || !Date.parse(query.date)) return cb(null, false, query);
    
        getFreqDate(freq, date).then(dateScope=>{
            return getVehicleHistory(dateScope, branch, carID).then(history=>{
                return {
                    dateStart: Date.parse(dateScope[0]).toString("MMMM dd, yyyy"),
                    dateEnd: Date.parse(dateScope[1]).addDays(-1).toString("MMMM dd, yyyy"),
                    records: history,
                }
            });
        }).then(data=>{
            if(data.records.length == 0) return data;
            return new Promise((res,rej)=>{
                var promises = [];
                data.records.forEach((e,i)=>{
                    promises.push(getInstructor(e.instID).then(instructor=>{
                        data.records[i].instructor = instructor.fullname;
                        return 1;
                    }));
                    promises.push(getStudent(e.studID).then(student=>{
                        data.records[i].student = student.fullname;
                        return 1;
                    }));
                    promises.push(getBranch(e.branchID).then(branchData=>{
                        data.records[i].branch = branchData.name;
                        return 1;
                    }));
                    promises.push(getCar(e.vehicleID).then(car=>{
                        data.records[i].car = car;
                        return 1;
                    }));
                    data.records[i].date = Date.parse(e.date).toString("MM/dd/yyyy");
                    data.records[i].startTime = Date.parse(e.startTime).toString("hh:mm tt");
                    if(i==data.records.length-1){
                        Promise.all(promises).then(a=>{
                            res(1);
                        }).catch(reason=>{
                            throw new Error(reason.stack);
                        }).catch(rej);
                    }
                });
            }).then(()=>{
                return data;
            });
        }).then(data=>{
            if(data.records.length == 0) return data;
            return new Promise((resolve, reject)=>{
                var cars = {};
                data.records.forEach((e,i)=>{
                    if(cars[e.vehicleID]){
                        cars[e.vehicleID].push(e);
                    }else{
                        cars[e.vehicleID] = [e];
                    }
                    if(i==data.records.length-1){
                        data.lists = [];
                        var top = null;
                        var low = null;
                        Object.keys(cars).forEach((e1,i1)=>{
                            data.lists.push(cars[e1]);
                            top = top ? (top.length < cars[e1].length ? cars[e1] : top) : cars[e1];
                            low = low ? (low.length > cars[e1].length ? cars[e1] : low) : cars[e1];
                            if(i1==Object.keys(cars).length-1){
                                data.most = top[0].car.brand + ", " + top[0].car.model + " (" + top[0].car.plate + ")";
                                data.least = low[0].car.brand + ", " + low[0].car.model + " (" + low[0].car.plate + ")";
                                resolve(data);
                            }
                        });
                    }
                });
            }).then(()=>{
                return data;
            });
        }).then(data=>{
            if(branch){
                return getBranch(branch).then(branchData=>{
                    data.branch = branchData.name;
                    return data;
                });
            }else{
                return data;
            }
        }).then(output=>{
            cb(null, output);
        }).catch(reason=>{
            throw new Error(reason.stack);
        }).catch(cb);
    });
}

// Get Start and Ending Dates based on frequency
function getFreqDate(freq, date){
    return new Promise((resolve)=>{
        var dateScope = [];

        if(freq == 1){
            dateScope.push(Date.parse(date).toString('yyyy-MM-dd 00:00:00'));
            dateScope.push(Date.parse(date).toString('yyyy-MM-dd 23:59:59'));
        }else if(freq == 2){
            dateScope.push(Date.parse(date).addDays(-1).toString('yyyy-MM-dd 00:00:00'));
            dateScope.push(Date.parse(date).addDays(6).toString('yyyy-MM-dd 23:59:59'));
        }else if(freq == 3){
            dateScope.push(Date.parse(date).toString('yyyy-MM-dd 00:00:00'));
            dateScope.push(Date.parse(date).addMonths(1).addDays(-1).toString('yyyy-MM-dd 23:59:59'));
        }else if(freq == 4){
            dateScope.push(Date.parse(date).addMonths(3).toString('yyyy-MM-dd 00:00:00'));
            dateScope.push(Date.parse(date).toString('yyyy-MM-dd 00:00:00'));
        }else if(freq == 5){
            dateScope.push(Date.parse(date).addMonths(-5).toString('yyyy-MM-dd 00:00:00'));
            dateScope.push(Date.parse(date).addMonths(1).addDays(-1).toString('yyyy-MM-dd 23:59:59'));
        }else if(freq == 6){
            dateScope.push(Date.parse(date).toString('yyyy-01-01 00:00:00'));     
            dateScope.push(Date.parse(date).toString('yyyy-12-31 23:59:59'));     
        }

        resolve(dateScope);
    });
}

function getBranch(id){
    return new Promise((resolve, reject)=>{
        var sql = "SELECT * FROM " + branchTable;
        if(id){
            sql += " WHERE id = ?";
        }

        db.get().query(sql, [id], function(err, results){
            if(err) return reject(err);
            resolve(results.length == 1 ? results[0] : results);
        });
    });
};

function getCourseName(id){
    return new Promise((resolve, reject)=>{
        var sql = "SELECT * FROM " + courseTable + " WHERE id = ?";
        db.get().query(sql, [id], function(err, result){
            if(err) return reject(err);
            if(result.length == 0) return resolve("");
            var pad = "000";
            id = id + "";
            var courseName = "CRS-" + result[0].carType.toUpperCase() + (pad.substring(0, pad.length - id.length) + id);
            resolve(courseName);
        });
    });
}

function getEnrolled(dateScope, branch){
    return new Promise((resolve, reject)=>{
        var sql = "SELECT * FROM " + PreRegister.table + " WHERE status > 0 AND dateSubmit BETWEEN ? AND ? ";
        var data = [dateScope[0],dateScope[1]];
        if(branch){
            sql += "AND data LIKE '%\"branch\":\""+ branch +"\"%'";
            data.push(branch);
        }
    
        db.get().query(sql, data, function(err, results){
            if(err) return reject(err);
            if(results.length == 0) return resolve(results);
            results.forEach((e,i)=>{
                try{
                    e.data = JSON.parse(e.data);
                }catch(er){
                    e.data = {};
                }
                if(i==results.length-1){
                    resolve(results);
                }
            });
        });
    });
}

function getStudentViaORnum(ORnum){
    return new Promise((resolve, reject)=>{
        var sql = "SELECT e.studID, ui.fullname, c.id, c.carType, b.name FROM userinfo ui, course c, enrollment e, course_enrolled ce, student s, branch b WHERE s.userinfo = ui.id AND c.id = ce.courseID AND s.id = e.studID AND ce.enrollmentID = e.id AND b.id = s.branch AND e.accountID = ?";
        db.get().query(sql, [ORnum], function(err, result){
            if(err) return reject(err);
            if(result.length == 0) return resolve(null);
            resolve(result[0]);
        });
    }).then(data=>{
        if(!data) return data;
        return {
            id: data.studID + "",
            fullname: data.fullname + "",
            courseID: data.id + "",
            carType: data.carType + "",
            branch: data.name + "",
        }
    });
}

function getStudent(id){
    return new Promise((resolve, reject)=>{
        var sql = "SELECT s.*, ui.fullname FROM " + Student.table + " s, "+ Student.infoTable +" ui WHERE s.userInfo = ui.id AND s.id = ?";
        db.get().query(sql,[id], function(err, result){
            if(err) return reject(err);
            resolve(result[0]);
        });
    });
}

function getInstructor(id){
    return new Promise((resolve, reject)=>{
        var sql = "SELECT i.*, ui.*, i.id as 'instID' FROM " + instructorTable + " i, " + Student.infoTable + " ui WHERE i.userInfo = ui.id ";
        var data = [];
        if(id){
            sql += "AND i.id = ?";
            data.push(id);
        }
        db.get().query(sql, data, function(err, result){
            if(err) return reject(err);
            resolve(id ? result[0] : result);
        });
    });
}

function getCar(id){
    return new Promise((resolve, reject)=>{
        var sql = "SELECT * FROM " + carTable;
        if(id) sql += " WHERE id = ?";
        db.get().query(sql, [id], function(err, results){
            if(err) return reject(err);
            resolve(id ? results[0] : results);
        });
    });
}

function getCarOfInst(instID){
    return new Promise((resolve, reject)=>{
        var sql = "SELECT * FROM " + carTable + " WHERE driver = ?";
        db.get().query(sql, [instID], function(err, results){
            if(err) return reject(err);
            resolve(results[0]);
        });
    });
}

function getPaidTransactions(dateScope, transactionType, branch){
    return new Promise((resolve, reject)=>{
        var sql = "SELECT * FROM " + Reports.table + " WHERE price != balance AND date BETWEEN ? AND ? ";
        if(transactionType){
            sql += "AND transaction LIKE '%"+ transactionType +"%' ";
        }
        if(branch){
            sql += "AND data LIKE '%\"branch\":\""+ branch + "\"%'";
        }
        db.get().query(sql, dateScope, function(err, results){
            if(err) return reject(err);
            if(results.length == 0) return resolve(results);
            results.forEach((e,i)=> {
                try{
                    results[i].data = JSON.parse(e.data);
                }catch(e){
                    return reject(e);
                }             
                if(i==results.length-1) resolve(results);   
            });
        });
    });
}

function getUnpaidTransactions(dateScope, transactionType, branch){
    return new Promise((resolve, reject)=>{
        var sql = "SELECT * FROM " + Reports.table + " WHERE price != balance AND balance != 0 AND date BETWEEN ? AND ? ";
        if(transactionType){
            sql += "AND transaction LIKE '%"+ transactionType +"%' ";
        } 
        if(branch){
            sql += "AND data LIKE '%\"branch\":\""+ branch + "\"%'";
        }

        db.get().query(sql, dateScope, function(err,results){
            if(err) return reject(err);
            if(results.length == 0) return resolve(results);
            results.forEach((e,i)=> {
                try{
                    results[i].data = JSON.parse(e.data);
                }catch(e){
                    return reject(e);
                }             
                if(i==results.length-1) resolve(results);   
            });
        });
    });
}

function getVehicleHistory(dateScope, branch, carID){
    return new Promise((resolve, reject)=>{
        var sql = "SELECT a.* FROM " + activityTable + " a, "+ carTable +" c WHERE a.vehicleID = c.id AND date BETWEEN ? AND ? ";
        if(branch){
            sql += "AND a.branchID = ?";
            dateScope.push(branch);
        }

        if(carID){
            sql += "AND c.plate = ?";
            dateScope.push(carID);
        }

        sql += " ORDER BY date ASC";
        db.get().query(sql, dateScope, function(err, results){
            if(err) return reject(err);
            resolve(results);
        });
    });
}

function transactionBreakdown(transaction){
    return new Promise((resolve, reject)=>{

    });
}

function getLicensePrice(id,name){
    return new Promise((resolve,reject)=>{
        var sql = "SELECT l.desc, l.price FROM " + licenseTable + " l WHERE l.id = ?";
        db.get().query(sql, [id], function(err, results){
            if(err) reject(err);
            resolve(name ? results[0] :  results[0].price);
        });
    }).then(result=>{
        var output = 0;
        output = result;
        return output;
    })/* .catch(reason=>{
        return new Error(reason);
    }) */;
}

module.exports = Reports;

//#region trash
//STUDENTS
//------------------------ENROLLEES
// Reports.getStud1A = function(date, cb){
//     var sql = "SELECT * FROM preregstudent WHERE DATE(dateSubmit)=?";
//     db.get().query(sql, [date], function(err, result){
//         if(err) return cb(err);
//         cb(null, result);
//     });
// }
/* 
//DB: Tups, padagdag sa WHERE clause yung sa specific branch. thankks!
Reports.getStud1A = function(date){
    return new Promise(function(resolve, reject){
        var sql = "SELECT * FROM preregstudent WHERE DATE(dateSubmit)=?";
        db.get().query(sql, [date], function(err, result){
            if(err) return reject(err);
            if(result.length==0){
                resolve([]);
            }else{
                resolve(result);
            }
        });
    });
};

Reports.getStud1B = function(week, year, cb){
    var sql = "SELECT * FROM preregstudent WHERE WEEK(dateSubmit)=(?-1) AND YEAR(dateSubmit)=? ORDER BY dateSubmit";
    db.get().query(sql, [week, year], function(err, result){
        if(err) return cb(err);
        cb(null, result);
    });
}

Reports.getStud1C = function(month, year, cb){
    var sql = "SELECT * FROM preregstudent WHERE MONTH(dateSubmit)=? AND YEAR(dateSubmit)=? ORDER BY dateSubmit";
    db.get().query(sql, [month, year], function(err, result){
        if(err) return cb(err);
        cb(null, result);
    });
}

Reports.getStud1D = function(monthto, monthfrom, yearto, yearfrom, cb){
    var sql = "SELECT * FROM preregstudent WHERE (MONTH(dateSubmit)<=? AND MONTH(dateSubmit)>=?) AND (YEAR(dateSubmit)<=? AND YEAR(dateSubmit)>=?) ORDER BY dateSubmit";
    db.get().query(sql, [monthto, monthfrom, yearto, yearfrom], function(err, result){
        if(err) return cb(err);
        cb(null, result);
    });
}

Reports.getStud1E = function(year, cb){
    var sql = "SELECT * FROM preregstudent WHERE YEAR(dateSubmit)=? ORDER BY dateSubmit";
    db.get().query(sql, [year], function(err, result){
        if(err) return cb(err);
        cb(null, result);
    });
}

//------------------------TRANSFEREES
Reports.getStud2A = function(date, cb){
    var sql = "SELECT * FROM transfer_request WHERE DATE(effectiveDate)=?";
    db.get().query(sql, [date], function(err, result){
        if(err) return cb(err);
        cb(null, result);
    });
}
Reports.getStud2B = function(week, year, cb){
    var sql = "SELECT * FROM transfer_request WHERE WEEK(effectiveDate)=(?-1) AND YEAR(effectiveDate)=? ORDER BY effectiveDate";
    db.get().query(sql, [week, year], function(err, result){
        if(err) return cb(err);
        cb(null, result);
    });
}

Reports.getStud2C = function(month, year, cb){
    var sql = "SELECT * FROM transfer_request WHERE MONTH(effectiveDate)=? AND YEAR(effectiveDate)=? ORDER BY effectiveDate";
    db.get().query(sql, [month, year], function(err, result){
        if(err) return cb(err);
        cb(null, result);
    });
}

Reports.getStud2D = function(monthto, monthfrom, yearto, yearfrom, cb){
    var sql = "SELECT * FROM transfer_request WHERE (MONTH(effectiveDate)<=? AND MONTH(effectiveDate)>=?) AND (YEAR(effectiveDate)<=? AND YEAR(effectiveDate)>=?) ORDER BY effectiveDate";
    db.get().query(sql, [monthto, monthfrom, yearto, yearfrom], function(err, result){
        if(err) return cb(err);
        cb(null, result);
    });
}

Reports.getStud2E = function(year, cb){
    var sql = "SELECT * FROM transfer_request WHERE YEAR(effectiveDate)=? ORDER BY effectiveDate";
    db.get().query(sql, [year], function(err, result){
        if(err) return cb(err);
        cb(null, result);
    });
}

//------------------------ENROLEED STUDENTS
Reports.getStud3A = function(date, cb){
    var sql = "SELECT * FROM student WHERE DATE(dateRegistered)=?";
    db.get().query(sql, [date], function(err, result){
        if(err) return cb(err);
        cb(null, result);
    });
}
Reports.getStud3B = function(week, year, cb){
    var sql = "SELECT * FROM student WHERE WEEK(dateRegistered)=(?-1) AND YEAR(dateRegistered)=? ORDER BY dateRegistered";
    db.get().query(sql, [week, year], function(err, result){
        if(err) return cb(err);
        cb(null, result);
    });
}

Reports.getStud3C = function(month, year, cb){
    var sql = "SELECT * FROM student WHERE MONTH(dateRegistered)=? AND YEAR(dateRegistered)=? ORDER BY dateRegistered";
    db.get().query(sql, [month, year], function(err, result){
        if(err) return cb(err);
        cb(null, result);
    });
}

Reports.getStud3D = function(monthto, monthfrom, yearto, yearfrom, cb){
    var sql = "SELECT * FROM student WHERE (MONTH(dateRegistered)<=? AND MONTH(dateRegistered)>=?) AND (YEAR(dateRegistered)<=? AND YEAR(dateRegistered)>=?) ORDER BY dateRegistered";
    db.get().query(sql, [monthto, monthfrom, yearto, yearfrom], function(err, result){
        if(err) return cb(err);
        cb(null, result);
    });
}

Reports.getStud3E = function(year, cb){
    var sql = "SELECT * FROM student WHERE YEAR(dateRegistered)=? ORDER BY dateRegistered";
    db.get().query(sql, [year], function(err, result){
        if(err) return cb(err);
        cb(null, result);
    });
}

//------------------------PERFORMANCE EVALUATION
Reports.getStud4A = function(date, cb){
    var sql = "SELECT * FROM evaluation WHERE target=1 AND DATE(dateEvaluated)=?";
    db.get().query(sql, [date], function(err, result){
        if(err) return cb(err);
        cb(null, result);
    });
}
Reports.getStud4B = function(week, year, cb){
    var sql = "SELECT * FROM evaluation WHERE target=1 AND WEEK(dateEvaluated)=(?-1) AND YEAR(dateEvaluated)=? ORDER BY dateEvaluated";
    db.get().query(sql, [week, year], function(err, result){
        if(err) return cb(err);
        cb(null, result);
    });
}

Reports.getStud4C = function(month, year, cb){
    var sql = "SELECT * FROM evaluation WHERE target=1 AND MONTH(dateEvaluated)=? AND YEAR(dateEvaluated)=? ORDER BY dateEvaluated";
    db.get().query(sql, [month, year], function(err, result){
        if(err) return cb(err);
        cb(null, result);
    });
}

Reports.getStud4D = function(monthto, monthfrom, yearto, yearfrom, cb){
    var sql = "SELECT * FROM evaluation WHERE target=1 AND (MONTH(dateEvaluated)<=? AND MONTH(dateEvaluated)>=?) AND (YEAR(dateEvaluated)<=? AND YEAR(dateEvaluated)>=?) ORDER BY dateEvaluated";
    db.get().query(sql, [monthto, monthfrom, yearto, yearfrom], function(err, result){
        if(err) return cb(err);
        cb(null, result);
    });
}

Reports.getStud4E = function(year, cb){
    var sql = "SELECT * FROM evaluation WHERE target=1 AND YEAR(dateEvaluated)=? ORDER BY dateEvaluated";
    db.get().query(sql, [year], function(err, result){
        if(err) return cb(err);
        cb(null, result);
    });
} 
*/
//#endregion trash