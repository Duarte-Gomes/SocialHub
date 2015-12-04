'use strict';

angular.module('socialhubprograms')
    .factory('ProgramsDataService', function(DS) {

        var programResource = DS.defineResource({
            name: 'program',
            idAttribute: 'IdProgram',
            endpoint: '/programs',
            baseUrl: 'http://socialhub.gotvmediasoftware.com/api'
        });

        var widgetTypeResource = DS.defineResource({
            name: 'widgetType',
            idAttribute: 'IdWidget',
            endpoint: '/widgets',
            baseUrl: 'http://socialhub.gotvmediasoftware.com/api'
        });

        var programWidgetResource = DS.defineResource({
            name: 'programwidget',
            idAttribute: 'IdProgramWidget',
            baseUrl: 'http://socialhub.gotvmediasoftware.com/api',            
        });

        var programWidgetSettingsResource = DS.defineResource({
            name: 'programWidgetSettings',
            idAttribute: 'IdSetting',
            baseUrl: 'http://socialhub.gotvmediasoftware.com/api',
        });

        return {
            getProgramsList: function() {
                return programResource.findAll(null, {bypassCache:true});
            },

            getSingleProgramList: function(program) {
                return programResource.find(program.IdProgram);
            },

            newProgramDetails: function(program) {
                return programResource.create(program);
            },

            saveProgramDetails: function(program) {
                return programResource.update(program.IdProgram, program);
            },

            deleteProgram: function(program) {
                return programResource.destroy(program.IdProgram);
            },

            getProgramWidgetList: function(idprogram) {
                return programWidgetResource.findAll(null, {endpoint: '/programs/' + idprogram + '/widgets', bypassCache:true});
            },

            getGraphicWidget: function () {
                return widgetTypeResource.findAll();
            },
            //----->
            newProgramWidget: function (programwidget) {
                return programWidgetResource.create(programwidget, {endpoint: '/programs/' + programwidget.IdProgram + '/widgets'});
            },

            saveProgramWidget: function (widget) {
                return programWidgetResource.update(widget.IdProgramWidget, widget, {endpoint: '/programs/' + widget.IdProgram + '/widgets'});
            },

            destroyProgramWidget: function (widget) {
                return programWidgetResource.destroy(widget.IdProgramWidget, {endpoint: 'programs/' + widget.IdProgram + '/widgets'});
            },

            getProgramWidgetSettingsList: function (widget) {
                return programWidgetSettingsResource.findAll(null, {endpoint: '/programs/' + widget.IdProgram + '/widgets/' + widget.IdProgramWidget + '/settings', bypassCache:true});
            },

            saveProgramWidgetSettings : function (sett, widget) {
                return programWidgetSettingsResource.create(sett, {endpoint: '/programs/' + widget.IdProgram + '/widgets/' + widget.IdProgramWidget + '/settings'});
            },
        };
    });

