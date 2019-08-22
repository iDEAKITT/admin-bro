"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _viewHelpers = _interopRequireDefault(require("../../../../backend/utils/view-helpers"));

var _mapValue = _interopRequireDefault(require("./map-value"));

var _types = require("../../../types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class List extends _react.default.PureComponent {
  render() {
    const {
      property,
      record,
      resource
    } = this.props;
    const showAction = resource.recordActions.find(a => a.name === 'show');
    const value = (0, _mapValue.default)(record.params[property.name]);

    if (resource.titleProperty.name === property.name && showAction) {
      const h = new _viewHelpers.default();
      const href = h.recordActionUrl({
        resourceId: resource.id,
        recordId: record.id,
        actionName: 'show'
      });
      return _react.default.createElement(_reactRouterDom.Link, {
        to: href
      }, value);
    }

    return _react.default.createElement("span", null, value);
  }

}

exports.default = List;
List.propTypes = {
  property: _types.propertyType.isRequired,
  record: _types.recordType.isRequired,
  resource: _types.resourceType.isRequired
};