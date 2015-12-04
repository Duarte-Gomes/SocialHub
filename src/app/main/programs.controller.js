'use strict';

angular
    .module('socialhubprograms')
    .controller('ProgramsCtrl', ProgramsCtrl);

  	function ProgramsCtrl(ProgramsDataService, $scope, $route) {
    
    var saveState;    

    ProgramsDataService.getProgramsList ().then(function (programlist) {
        $scope.programs = programlist;
    });
    //$scope.selectedProgram = $scope.programs[0];

    $scope.dropdown = [];
    
    //$scope.dropdown = ProgramsDataService.getWidgetTypeList ();
    $scope.showprogram = showprogram;
    $scope.newprogram = newprogram;
    $scope.saveprogram = saveprogram;
    $scope.cancelprogram = cancelprogram;
    $scope.deleteprogram = deleteprogram;

    $scope.showProgramWidget = showProgramWidget;
    $scope.newProgramWidget = newProgramWidget;
    $scope.saveProgramWidget = saveProgramWidget;
    $scope.deleteProgramWidget = deleteProgramWidget;


    //$scope.showsetting = showsetting;
    //$scope.savesetting = savesetting;

 /////////////implementation



    function showprogram(program) {
        saveState = 0;
        $scope.selectedProgram = program;

        ProgramsDataService.getProgramWidgetList (program.IdProgram).then(function (widgetlist) {
            $scope.programWidgetList = widgetlist;
        });
    }

    function newprogram() {
        saveState = 1;
        $scope.selectedProgram = {Name: '', IconFile: '', Multimedia1: '', Multimedia2: '', Multimedia3: '', Freetext1: '', Freetext2: '', Freetext3: ''};
    }    

    function saveprogram(program) {
        if (saveState === 1) {
            //program = ProgramsDataService.newProgramDetails (program);
            ProgramsDataService.newProgramDetails (program).then (function (){
        });
            saveState = 0;
        } else {
            program = ProgramsDataService.saveProgramDetails (program);
        }
        $route.reload(program);
    }

    function cancelprogram(program) {
        if (saveState === 1) {
            $route.reload();
        } else {
            ProgramsDataService.getProgramsList ().then(function (program) {
                $scope.programs = program;
            });
            showprogram(program);
        }
    }

    function deleteprogram(program) {
        program = ProgramsDataService.deleteProgram (program);
        $route.reload();
    }

    function showProgramWidget(widget) {
        $scope.programWidgetSelected = widget;
        
        ProgramsDataService.getGraphicWidget ().then(function (graphicwidget) {
            $scope.graphicWidget = graphicwidget;
        }); 
        
        ProgramsDataService.getProgramWidgetSettingsList (widget).then(function (widgetsetting) {
            $scope.programWidgetSettings = widgetsetting;
        });          
    }

    function newProgramWidget(widget) {
        saveState = 1;
        
        $scope.newProgramWidgetDetail = {IdProgram: '', IdWidget: '', Name: ''};
        $scope.newProgramWidgetDetail.IdProgram = widget;

        ProgramsDataService.getGraphicWidget ().then(function (graphicwidget) {
            $scope.graphicWidget = graphicwidget;
        });
    }

    function saveProgramWidget(programwidget, widgetsetting ) {
        if (saveState === 1) {
            programwidget = ProgramsDataService.newProgramWidget (programwidget);
            saveState = 0;
        } else {        
            ProgramsDataService.saveProgramWidget (programwidget).then(function() {
                ProgramsDataService.saveProgramWidgetSettings (widgetsetting, programwidget);
            });    
        }

        /*ProgramsDataService.getProgramsList ().then(function (program) {
                $scope.programs = program;
            });
        showprogram(programwidget);*/
    }

    function deleteProgramWidget(widget) {
        widget = ProgramsDataService.destroyProgramWidget (widget);
        
    }
}