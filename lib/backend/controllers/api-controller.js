/* eslint-disable max-len */
/* eslint no-unused-vars: 0 */
const { populator } = require('../utils/populator')
const Filter = require('../utils/filter')
const ViewHelpers = require('../utils/view-helpers')
const ForbiddenError = require('../utils/forbidden-error')

/**
 * Controller responsible for the autogenerated API: `/admin_root/api/...`, where
 * admin_root is the `rootPath` given in {@link AdminBroOptions}.
 *
 * The best way to utilise it is to use {@link ApiClient} on the frontend.
 *
 * ### Available API endpoints
 *
 * | Endpoint                 | Method                | Description |
 * |--------------------------|-----------------------|-------------|
 * | `.../api/resources/{resourceId}` | {@link ApiController#index} | List of records |
 * | `.../api/resources/{resourceId}/search/{query}` | {@link ApiController#search} | Search record by query string |
 * | `.../api/resources/{resourceId}/actions/{action}` | {@link ApiController#resourceAction} | Perform cusomised resource action |
 * | `.../api/resources/{resourceId}/records/{recordId}/{action}` | {@link ApiController#recordAction} | Perform cusomised record action |
 * | `.../api/dashboard` | {@link ApiController#dashboard} | Perform cusomised dashboard action |
 *
 * @hideconstructor
 */
class ApiController {
  constructor({ admin }, currentAdmin) {
    this._admin = admin
    this.currentAdmin = currentAdmin
  }

  /**
   * Returns context for given action
   * @private
   *
   * @param   {Object}  request  request object
   * @return  {BaseAction~Context} action context
   */
  async getActionContext(request) {
    const { resourceId, action: actionName, recordId } = request.params
    const h = new ViewHelpers(this._admin)
    const resource = this._admin.findResource(resourceId)
    let action
    if (recordId) {
      action = resource.decorate().recordActions(this.currentAdmin).find(a => a.name === actionName)
    } else {
      action = resource.decorate().resourceActions(this.currentAdmin).find(a => a.name === actionName)
    }

    return {
      resource, action, h, currentAdmin: this.currentAdmin,
    }
  }

  /**
   * @typedef {Object} ApiController~SearchResponse
   * @property {Array} records
   * @property {String} records[].title
   * @property {String} records[].id
   */

  /**
   * Search records by query string.
   *
   * Handler function reponsible for a `.../api/resources/{resourceId}/search/{query}` route
   *
   * @param   {Object}  request
   * @param   {Object}  response
   *
   * @return  {ApiController~SearchResponse}    found records
   */
  async search(request, response) {
    const queryString = request.params && request.params.query
    const resource = this._admin.findResource(request.params.resourceId)
    const decorated = resource.decorate()
    if (!decorated.actions.list.isAccessible(this.currentAdmin)) {
      throw new ForbiddenError('list', resource.id)
    }
    const titlePropertyName = decorated.titleProperty().name()

    const filters = queryString ? { [titlePropertyName]: queryString } : {}
    const filter = new Filter(filters, resource)

    const records = await resource.find(filter, {
      limit: 50,
      sort: {
        sortBy: titlePropertyName,
        direction: 'asc',
      },
    })

    return {
      records: records.map(record => record.toJSON()),
    }
  }

  /**
   * Performs a customized {@link Action resource action}.
   * To call it use {@link ApiClient#resourceAction} method.
   *
   * Handler function reponsible for a `.../api/resources/{resourceId}/actions/{action}`
   *
   * @param   {Object}  request
   * @param   {Object}  response
   *
   * @return  {Object}  action response
   */
  async resourceAction(request, response) {
    const actionContext = await this.getActionContext(request)
    if (!actionContext.action.isAccessible(this.currentAdmin)) {
      throw new ForbiddenError(actionContext.action.name, actionContext.resource.id)
    }
    return actionContext.action.handler(request, response, actionContext)
  }

  /**
   * Performs a customized {@link Action record action}.
   * To call it use {@link ApiClient#recordAction} method.
   *
   * Handler function reponsible for a `.../api/resources/{resourceId}/records/{recordId}/{action}`
   *
   * @param   {Object}  request
   * @param   {Object}  response
   *
   * @return  {Object}  action response
   */
  async recordAction(request, response) {
    const { recordId } = request.params
    const actionContext = await this.getActionContext(request)
    if (!actionContext.action.isAccessible(this.currentAdmin)) {
      throw new ForbiddenError(actionContext.action.name, actionContext.resource.id)
    }
    let record = await actionContext.resource.findOne(recordId);
    [record] = await populator([record])
    return actionContext.action.handler(request, response, { ...actionContext, record })
  }

  /**
   * Gets optional data needed by the dashboard.
   * To call it use {@link ApiClient#dashboard} method.
   *
   * Handler function reponsible for a `.../api/dashboard`
   *
   * @param   {Object}  request
   * @param   {Object}  response
   *
   * @return  {Object}  action response
   */
  async dashboard(request, response) {
    const h = new ViewHelpers(this._admin)
    const handler = this._admin.options.dashboard && this._admin.options.dashboard.handler
    if (handler) {
      return handler(request, response, { h, currentAdmin: this.currentAdmin })
    }
    return {
      message: 'You can override this method by setting up dashboard.handler fuction in AdminBro options',
    }
  }
}

module.exports = ApiController