"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Label", {
  enumerable: true,
  get: function () {
    return _label.default;
  }
});
exports.default = exports.Property = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _types = require("../../types");

var _label = _interopRequireDefault(require("./label"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Property = _styledComponents.default.div.withConfig({
  displayName: "property-in-filter__Property",
  componentId: "sc-14pn5s1-0"
})(["margin:", " 0;& input{border-radius:0;border-color:", ";box-shadow:none;background:transparent;color:", ";&:focus{border-color:", ";}}& .icon{opacity:0.25;}"], ({
  theme
}) => theme.sizes.paddingLayout, ({
  theme
}) => theme.colors.borderOnDark, ({
  theme
}) => theme.colors.lightText, ({
  theme
}) => theme.colors.primary);
/**
 * @classdesc
 * Wrapps input with label in Filter
 *
 * @hideconstructor
 * @component
 * @example
 * const property = {
 *   label: 'My amazing property',
 *   name: 'myAmazingProperty',
 * }
 * return (
 *   <WrapperBox style={{ background: '#303b62' }}>
 *     <PropertyInFilter property={property}>
 *       <input className="input" />
 *     </PropertyInFilter>
 *   </WrapperBox>
 * )
 */


exports.Property = Property;

const PropertyInFilter = props => {
  const {
    property,
    children
  } = props;
  return _react.default.createElement(Property, null, _react.default.createElement(_label.default, null, property.label), children);
};

PropertyInFilter.propTypes = {
  /**
   * Wrapped input element
   */
  children: _types.childrenType,

  /**
   * Property object based on {@link BaseProperty~JSON}
   */
  property: _propTypes.default.shape({
    /**
     * Property label
     */
    label: _propTypes.default.string.isRequired,

    /**
     * Unique property name - its patch.
     */
    name: _propTypes.default.string.isRequired
  }).isRequired
};
PropertyInFilter.defaultProps = {
  children: null
};
var _default = PropertyInFilter;
exports.default = _default;