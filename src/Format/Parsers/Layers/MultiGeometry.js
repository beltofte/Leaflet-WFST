/**
 * Abstract class for multigeometry parsers
 *
 * It is base class for parsing such xml's as
 *
 * ```xml
 * <gml:Multi%Something%>
 *   <gml:%somesting%Member>
 *     <gml:%Something1% />
 *   </gml:%somesting%Member>
 *   <gml:%somesting%Member>
 *     <gml:%Something2% />
 *   </gml:%somesting%Member>
 *   ...
 * <gml:Multi%Something%>
 * ```
 *
 * or
 *
 * ```xml
 * <gml:Multi%Something%>
 *   <gml:%somesting%Members>
 *     <gml:%Something1% />
 *     <gml:%Something2% />
 *     ...
 *   </gml:%somesting%Members>
 * <gml:Multi%Something%>
 * ```
 *
 * @class GML.MultiGeometry
 * @extends L.GML.Geometry
 */

L.GML.MultiGeometry = L.GML.Geometry.extend({
  includes: [L.GML.ParserContainerMixin, L.GML.CoordsToLatLngMixin],

  initialize: function () {
    this.initializeParserContainer();
  },

  /**
   * Convert element to array of geometry objects
   *
   * @method parse
   * @param {Element} element
   * @param {options}
   * @return {Array} array of geometry objects
   */
  parse: function (element, options) {
    options = this.elementOptions(element, options);
    var childObjects = [];
    for (var i = 0; i < element.childNodes.length; i++) {
      var geometryMember = element.childNodes[i];
      if (geometryMember.nodeType !== document.ELEMENT_NODE) continue;

      for (var j = 0; j < geometryMember.childNodes.length; j++) {
        var singleGeometry = geometryMember.childNodes[j];
        if (singleGeometry.nodeType !== document.ELEMENT_NODE) continue;

        childObjects.push(this.parseElement(singleGeometry, options));
      }
    }

    return this.transform(childObjects, options);
  }
});
