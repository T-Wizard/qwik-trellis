var qlik = window.require('qlik');
var $ = window.require('jquery');
import initialProperties from './initial-properties.js';
import template from './template.html';
import definition from './definition.js';
import controller from './controller.js';
import localCSS from './style.css'; // eslint-disable-line no-unused-vars

export default {
  initialProperties: initialProperties,
  template: template,
  definition: definition,
  controller: controller,
  paint: function () {
    const app = qlik.currApp(this);
    const scope = this.$scope;
    this.$scope.isInEdit = this.options.interactionState == 2;
    let headerWidth = $(".qlik-trellis-flex-grid").width();
    scope.headerWidth = { "width": `${headerWidth}` };

    // If this is a master object, fetch the properties of the original object
    app.getObjectProperties(scope.layout.qExtendsId || scope.layout.qInfo.qId)
      .then(function (model) {
        scope.sortCriterias = model.properties.qHyperCubeDef.qSortCriterias;
        scope.sortCriterias1 = model.properties.qHyperCubeDef.qDimensions[0].qDef.qSortCriterias;
        scope.nullSuppression1 = model.properties.qHyperCubeDef.qDimensions[0].qNullSuppression;
        scope.sortCriterias2 = model.properties.qHyperCubeDef.qDimensions[1] ? model.properties.qHyperCubeDef.qDimensions[1].qDef.qSortCriterias : undefined;
        scope.nullSuppression2 = model.properties.qHyperCubeDef.qDimensions[1] ? model.properties.qHyperCubeDef.qDimensions[1].qNullSuppression : undefined;
      });
  },
  support: {
    snapshot: false,
    export: false,
    exportData: false
  }
};
