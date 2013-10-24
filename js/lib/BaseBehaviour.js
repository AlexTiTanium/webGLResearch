/**
 * Created by akucherenko on 22.10.13.
 */
define(['toolbox', 'backbone'], function (Toolbox, Backbone){

    var defaultObject = {};

    _.extend(defaultObject, Backbone.Events);

    /**
     * BaseBehaviour class
     * @class BaseBehaviour
     */
    return  Toolbox.Base.extend(defaultObject);
});