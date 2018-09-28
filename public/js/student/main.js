$(function() {    
    $('.navAdmin').hide();
    $('.navBranch').hide();
    $('.navInstructor').hide();
    $('.navStudent').show();
    $('.headerAdmin').hide();
    $('.headerStudent').show();
    $('.headerInstructor').hide();
    $('.headerBranch').hide();
    app.start();
});

Dropzone.options.profileDrop = {
    maxFiles: 1,
    init: function(){
        this.on("queuecomplete", function(file){
            setTimeout(function() {
                //location.reload();
            });
        });

        var self = this;
        $('.clearUpload').on('click', function(){
            var action = $(this).data('action');
            if(action == "save"){
                saveProfPicStud(1);
            }else{
                if(self.files.length != 0){
                    saveProfPicStud(0);
                }
            }
            self.removeAllFiles();
        });
    }
};