sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "sap/ui/model/json/JSONModel",
    "com/tableentry/tablestructure/model/models"
], function (UIComponent, Device, JSONModel, models) {
    "use strict";

    return UIComponent.extend("com.tableentry.tablestructure.Component", {

        metadata: {
            manifest: "json"
        },

        /**
         * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
         * @public
         * @override
         */
        init: function () {
            // Call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // Enable routing
            this.getRouter().initialize();

            // Set the device model
            this.setModel(models.createDeviceModel(), "device");

            // Set application model
            const oAppModel = new JSONModel({
                busy: false,
                delay: 0
            });
            this.setModel(oAppModel, "app");

            // Ensure FLP communication is handled correctly
            this._registerFLPCommunication();
        },

        /**
         * Register FLP communication if running in Fiori Launchpad
         * @private
         */
        _registerFLPCommunication: function () {
            // Check if running in FLP
            if (sap.ushell && sap.ushell.Container) {
                // Register for FLP-specific events if necessary
                // Avoid subscribing to unknown channels like 'flp-app-info'
                // Example: Subscribe to cross-app navigation events if needed
                // sap.ushell.Container.getService("CrossApplicationNavigation");
            }
        },

        /**
         * Create the content for the component
         * @public
         * @returns {sap.ui.core.Control} The root control of the application
         */
        createContent: function () {
            // Create the root view
            return sap.ui.view({
                viewName: "com.tableentry.tablestructure.view.Table_Entry",
                type: sap.ui.core.mvc.ViewType.XML
            });
        },

        /**
         * Destroy the component
         * @public
         * @override
         */
        destroy: function () {
            // Call the base component's destroy function
            UIComponent.prototype.destroy.apply(this, arguments);
        }
    });
});
