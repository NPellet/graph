'use strict';

var jsdom = require('mocha-jsdom');
var path = require('path');
var assert = require("assert")

var jquery = path.resolve(__dirname + '/../../dist/jquery.min.js');
var jsgraph = path.resolve(__dirname + '/../../dist/jsgraph.js');

describe('Simple graph creation tests', function () {

    jsdom({
        scripts: [jquery, jsgraph]
    });

    it('Basic creation', function () {

        var div = document.createElement('div');
        var graph = new window.Graph(div);
        var serie = graph.newSerie('serie1');
        serie.setData([1, 100, 2, 80, 3, 55, 4, 65]);
        graph.redraw();
        graph.drawSeries();

    });


    it('Creation with declared ID', function () {
        var div = document.createElement('div');
        div.id = 'graphId';
        document.getElementsByTagName('body')[0].appendChild( div );
        var graph = new window.Graph('graphId');
        assert.equal( graph.getWrapper(), div );
    });



    it('Uniqueness of series', function () {
        var div = document.createElement('div');
        var graph = new window.Graph(div);
        var serie = graph.newSerie('serie1');
        var serie2 = graph.getSerie('serie1');
        assert.equal( serie, serie2 );
    });




});
