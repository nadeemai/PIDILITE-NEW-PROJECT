
/////UPADTED CONTROLLER.JS CODE 2////

sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/format/DateFormat"
], function (Controller, MessageBox, MessageToast, JSONModel, Filter, FilterOperator, DateFormat) {
    "use strict";

    return Controller.extend("com.tableentry.tablestructure.controller.Table_Entry", {
        onInit: function () {
            const oData = {
                draftCount: 0,
                sentBackCount: 1,
                rejectedCount: 1,
                inProgressCount: 2,
                allCount: 4,
                editable: false,
                filter: {
                    requestNo: "",
                    createdBy: "",
                    createdOn: "",
                    status: ""
                },
                statusItems: [
                    { key: "", text: "All" },
                    { key: "Draft", text: "Draft" },
                    { key: "Send Back", text: "Send Back" },
                    { key: "Rejected", text: "Rejected" },
                    { key: "Pending Request", text: "Pending Request" }
                ],
                requestTypes: [
                    { key: "TYPE1", text: "Type 1 Request" },
                    { key: "TYPE2", text: "Type 2 Request" },
                    { key: "TYPE3", text: "Type 3 Request" }
                ],
                newRequest: {
                    type: "",
                    description: "",
                    file: null
                },
                uploadedFiles: [
                    {
                        fileName: "PDF for justification - Email"
                    }
                ],
                uploadedFilesCount: 1,
                requests: [
                    { 
                        requestNo: "RM00000001",
                        createdBy: "Buyer",
                        createdOn: "Feb 02, 2025",
                        status: "Send Back",
                        remarks: "-",
                        pendingWith: "-",
                        requestAging: "15 Days",
                        referenceNo: "RM00000001",
                        division: "Division 1",
                        dcnrForm: "Form 123",
                        standardReason: "Price Change",
                        salesGroup: "Group A",
                        creatorComment: "Initial request",
                        dcnrTo: "Finance",
                        attachments: []
                    },
                    { 
                        requestNo: "RM00000002",
                        createdBy: "Buyer",
                        createdOn: "Feb 02, 2025",
                        status: "Draft",
                        remarks: "-",
                        pendingWith: "-",
                        requestAging: "15 Days",
                        referenceNo: "RM00000002",
                        division: "Division 1",
                        dcnrForm: "Form 123",
                        standardReason: "Price Change",
                        salesGroup: "Group A",
                        creatorComment: "Initial request",
                        dcnrTo: "Finance",
                        attachments: []
                    },
                    { 
                        requestNo: "RM00000003",
                        createdBy: "Buyer",
                        createdOn: "Feb 02, 2025",
                        status: "Rejected",
                        remarks: "-",
                        pendingWith: "-",
                        requestAging: "15 Days",
                        referenceNo: "RM00000003",
                        division: "Division 1",
                        dcnrForm: "Form 123",
                        standardReason: "Price Change",
                        salesGroup: "Group A",
                        creatorComment: "Initial request",
                        dcnrTo: "Finance",
                        attachments: []
                    },
                    { 
                        requestNo: "RM00000004",
                        createdBy: "Buyer",
                        createdOn: "Feb 02, 2025",
                        status: "Send Back",
                        remarks: "-",
                        pendingWith: "-",
                        requestAging: "15 Days",
                        referenceNo: "RM00000004",
                        division: "Division 1",
                        dcnrForm: "Form 123",
                        standardReason: "Price Change",
                        salesGroup: "Group A",
                        creatorComment: "Initial request",
                        dcnrTo: "Finance",
                        attachments: []
                    },
                    { 
                        requestNo: "RM00000005",
                        createdBy: "Buyer",
                        createdOn: "Feb 02, 2025",
                        status: "Send Back",
                        remarks: "-",
                        pendingWith: "-",
                        requestAging: "15 Days",
                        referenceNo: "RM00000005",
                        division: "Division 1",
                        dcnrForm: "Form 123",
                        standardReason: "Price Change",
                        salesGroup: "Group A",
                        creatorComment: "Initial request",
                        dcnrTo: "Finance",
                        attachments: []
                    },
                    { 
                        requestNo: "RM00000006",
                        createdBy: "Buyer",
                        createdOn: "Feb 02, 2025",
                        status: "Send Back",
                        remarks: "-",
                        pendingWith: "-",
                        requestAging: "15 Days",
                        referenceNo: "RM00000006",
                        division: "Division 1",
                        dcnrForm: "Form 123",
                        standardReason: "Price Change",
                        salesGroup: "Group A",
                        creatorComment: "Initial request",
                        dcnrTo: "Finance",
                        attachments: []
                    },
                    { 
                        requestNo: "RM00000007",
                        createdBy: "Buyer",
                        createdOn: "Feb 02, 2025",
                        status: "Pending Request",
                        remarks: "-",
                        pendingWith: "user3@pellme.com",
                        requestAging: "15 Days",
                        referenceNo: "RM00000007",
                        division: "Division 2",
                        dcnrForm: "Form 456",
                        standardReason: "New Product",
                        salesGroup: "Group B",
                        creatorComment: "Urgent request",
                        dcnrTo: "Sales",
                        attachments: []
                    }
                ],
                approvers: [
                    {
                        role1: "Approver 1",
                        approver1: "ayush.jha@sumo",
                        role2: "Alternate Approver 1",
                        approver2: "tani.singh@sumo"
                    },
                    {
                        role1: "Approver 2",
                        approver1: "ayushi.khanolkar@sumo",
                        role2: "Alternate Approver 2",
                        approver2: "aakib.mohd@sumo"
                    },
                    {
                        role1: "Approver 3",
                        approver1: "yugal.kishore@sumo",
                        role2: "Alternate Approver 3",
                        approver2: "sumit.jhadjiyal@sumo"
                    }
                ],
                timelineItems: [
                    {
                        dateTime: "7/22/2016 at 3:00 PM",
                        title: "Ankit Patilak Created a Request",
                        text: "PLEASE go through and evaluate.",
                        userName: "Ankit Patilak",
                        userPicture: "https://ui-avatars.com/api/?name=Ankit+Patilak"
                    },
                    {
                        dateTime: "7/22/2016 at 5:00 PM",
                        title: "Ayushi added a note [APPROVED]",
                        text: "OK",
                        userName: "Ayushi",
                        userPicture: "https://ui-avatars.com/api/?name=Ayushi"
                    },
                    {
                        dateTime: "7/22/2016 at 3:00 PM",
                        title: "Vikrant Sir added a note [APPROVED]",
                        text: "Done",
                        userName: "Vikrant Sir",
                        userPicture: "https://ui-avatars.com/api/?name=Vikrant+Sir"
                    },
                    {
                        dateTime: "7/22/2016 at 3:00 PM",
                        title: "subham added a note [Approved]",
                        text: "Done.",
                        userName: "Subham",
                        userPicture: "https://ui-avatars.com/api/?name=Naresh"
                    },
                    {
                        dateTime: "7/22/2016 at 3:00 PM",
                        title: "Yugal added a note [APPROVED]",
                        text: "ok",
                        userName: "Yugal",
                        userPicture: "https://ui-avatars.com/api/?name=Yugal"
                    }
                ],
                priceDetails: [
                    {
                        material: "FC88B7866",
                        priceList: "04",
                        priceListDescription: "Price Lot 04",
                        uom: "EA",
                        indicativeMRP: "41.00",
                        startDate: "13-05-2025",
                        endDate: "24-07-2025",
                        defaultPrice: "X"
                    },
                    {
                        material: "FC88B7866",
                        priceList: "04",
                        priceListDescription: "Price Lot 04",
                        uom: "EA",
                        indicativeMRP: "41.00",
                        startDate: "18-05-2025",
                        endDate: "4-07-2025",
                        defaultPrice: "X"
                    },
                    {
                        material: "FC88B7866",
                        priceList: "04",
                        priceListDescription: "Price Lot 04",
                        uom: "EA",
                        indicativeMRP: "42.00",
                        startDate: "23-05-2025",
                        endDate: "2-07-2025",
                        defaultPrice: "X"
                    },
                    {
                        material: "FC88B7866",
                        priceList: "04",
                        priceListDescription: "Price Lot 04",
                        uom: "EA",
                        indicativeMRP: "71.09",
                        startDate: "3-05-2025",
                        endDate: "11-07-2025",
                        defaultPrice: "X"
                    }
                ],
                selectedRequest: {}
            };

            const oModel = new JSONModel(oData);
            this.getView().setModel(oModel);
            this._updateCounts();
        },

        onTilePress: function(oEvent) {
            const sHeader = oEvent.getSource().getHeader();
            const oTable = this.byId("dashboardTable");
            const oBinding = oTable.getBinding("items");
            
            let aFilters = [];
            switch(sHeader) {
                case "My Draft Requests":
                    aFilters.push(new Filter("status", FilterOperator.EQ, "Draft"));
                    break;
                case "Sent Back Requests":
                    aFilters.push(new Filter("status", FilterOperator.EQ, "Send Back"));
                    break;
                case "Rejected Requests":
                    aFilters.push(new Filter("status", FilterOperator.EQ, "Rejected"));
                    break;
                case "In-Progress Requests":
                    aFilters.push(new Filter("status", FilterOperator.EQ, "Pending Request"));
                    break;
            }
            
            oBinding.filter(aFilters);
            MessageToast.show(`Filtered by ${sHeader}`);
        },

        onFilterChange: function() {
            const oTable = this.byId("dashboardTable");
            const oBinding = oTable.getBinding("items");
            const oModel = this.getView().getModel();
            const oFilters = oModel.getProperty("/filter");
            
            let aFilters = [];
            
            if (oFilters.requestNo) {
                aFilters.push(new Filter("requestNo", FilterOperator.Contains, oFilters.requestNo));
            }
            
            if (oFilters.createdBy) {
                aFilters.push(new Filter("createdBy", FilterOperator.Contains, oFilters.createdBy));
            }
            
            if (oFilters.createdOn) {
                aFilters.push(new Filter("createdOn", FilterOperator.EQ, oFilters.createdOn));
            }
            
            if (oFilters.status) {
                aFilters.push(new Filter("status", FilterOperator.EQ, oFilters.status));
            }
            
            oBinding.filter(aFilters);
        },

        onClearFilters: function() {
            const oModel = this.getView().getModel();
            oModel.setProperty("/filter", {
                requestNo: "",
                createdBy: "",
                createdOn: "",
                status: ""
            });
            
            this.onFilterChange();
            MessageToast.show("Filters cleared");
        },

        onCreatePress: function() {
            this.getView().getModel().setProperty("/newRequest", {
                type: "",
                description: "",
                file: null
            });
            
            this.byId("createRequestDialog").open();
        },

        onCreateRequest: function() {
            const oModel = this.getView().getModel();
            const oNewRequest = oModel.getProperty("/newRequest");
            const aUploadedFiles = oModel.getProperty("/uploadedFiles");
            
            const aRequests = oModel.getProperty("/requests");
            const iNewId = aRequests.length + 1;
            const sNewRequestNo = "RM" + String(iNewId).padStart(7, "0");
            
            const oDateFormat = DateFormat.getDateInstance({style: "medium"});
            const sCurrentDate = oDateFormat.format(new Date());
            
            const oRequest = {
                requestNo: sNewRequestNo,
                createdBy: "Current User",
                createdOn: sCurrentDate,
                status: "Draft",
                remarks: oNewRequest.description || "-",
                pendingWith: "-",
                requestAging: "0 Days",
                referenceNo: sNewRequestNo,
                division: "",
                dcnrForm: "",
                standardReason: "",
                salesGroup: "",
                creatorComment: "",
                dcnrTo: "",
                attachments: aUploadedFiles.map(file => ({ fileName: file.fileName }))
            };
            
            aRequests.unshift(oRequest);
            oModel.setProperty("/requests", aRequests);
            
            this._updateCounts();
            
            this.byId("createRequestDialog").close();
            MessageToast.show("Request created successfully");
            
            oModel.setProperty("/selectedRequest", JSON.parse(JSON.stringify(oRequest)));
            
            // Open the request details in a new tab
            const oDialog = this.byId("requestDetailsDialog");
            const oDialogContent = oDialog.getContent()[0]; // Get the panel inside the dialog
            
            // Create a new window
            const oNewWindow = window.open("", "_blank");
            
            // Write the dialog content to the new window with the modified structure
            // oNewWindow.document.write(`
                
            // `);
        },

        onCancelCreate: function() {
            this.byId("createRequestDialog").close();
        },

        onItemPress: function(oEvent) {
            const oItem = oEvent.getParameter("listItem");
            const oContext = oItem.getBindingContext();
            const oData = oContext.getObject();
            
            const oSelectedRequest = JSON.parse(JSON.stringify(oData));
            this.getView().getModel().setProperty("/selectedRequest", oSelectedRequest);
            
            this.getView().byId("requestDetailsDialog").open();
        },

        onSaveRequest: function() {
            const oModel = this.getView().getModel();
            const oSelectedRequest = oModel.getProperty("/selectedRequest");
            
            const aRequests = oModel.getProperty("/requests");
            const iIndex = aRequests.findIndex(req => req.requestNo === oSelectedRequest.requestNo);
            if (iIndex >= 0) {
                aRequests[iIndex] = oSelectedRequest;
                oModel.setProperty("/requests", aRequests);
            }
            
            MessageToast.show("Request saved successfully");
        },

        onSubmitRequest: function() {
            const oModel = this.getView().getModel();
            const oSelectedRequest = oModel.getProperty("/selectedRequest");
            
            oSelectedRequest.status = "Pending Request";
            oSelectedRequest.pendingWith = "next-approver@example.com";
            
            const aRequests = oModel.getProperty("/requests");
            const iIndex = aRequests.findIndex(req => req.requestNo === oSelectedRequest.requestNo);
            if (iIndex >= 0) {
                aRequests[iIndex] = oSelectedRequest;
                oModel.setProperty("/requests", aRequests);
            }
            
            this._updateCounts();
            oModel.setProperty("/editable", false);
            MessageToast.show("Request submitted successfully");
            this.getView().byId("requestDetailsDialog").close();
        },

        onPrintRequest: function() {
            MessageToast.show("Printing request...");
        },

        onCloseRequest: function() {
            const oModel = this.getView().getModel();
            oModel.setProperty("/editable", false);
            this.getView().byId("requestDetailsDialog").close();
        },

        onEditRequest: function() {
            const oModel = this.getView().getModel();
            const bEditable = !oModel.getProperty("/editable");
            oModel.setProperty("/editable", bEditable);
            MessageToast.show(bEditable ? "Edit mode activated" : "Edit mode deactivated");
        },

        handleUploadComplete: function(oEvent) {
            const sResponse = oEvent.getParameters().response;
            const iHttpStatusCode = parseInt(/\d{3}/.exec(sResponse) ? /\d{3}/.exec(sResponse)[0] : 0);
            const sMessage = iHttpStatusCode === 200 ? "File upload complete (Success)" : "File upload failed (Error)";
            MessageToast.show(sMessage);
        },

        handleValueChange: function(oEvent) {
            const sFileName = oEvent.getParameter("newValue");
            const oModel = this.getView().getModel();
            const aUploadedFiles = oModel.getProperty("/uploadedFiles");
            aUploadedFiles.push({ fileName: sFileName });
            oModel.setProperty("/uploadedFiles", aUploadedFiles);
            oModel.setProperty("/uploadedFilesCount", aUploadedFiles.length);
            MessageToast.show("File selected: " + sFileName);
        },

        onDownloadFile: function(oEvent) {
            const oItem = oEvent.getSource().getBindingContext().getObject();
            MessageToast.show("Downloading file: " + oItem.fileName);
        },

        handleTypeMissmatch: function(oEvent) {
            const aFileTypes = oEvent.getSource().getFileType().map(sType => "*." + sType);
            MessageToast.show(`The file type *.${oEvent.getParameter("fileType")} is not supported. Choose one of the following types: ${aFileTypes.join(", ")}`);
        },

        _updateCounts: function() {
            const oModel = this.getView().getModel();
            const aRequests = oModel.getProperty("/requests");
            
            const oCounts = {
                draftCount: aRequests.filter(r => r.status === "Draft").length,
                sentBackCount: aRequests.filter(r => r.status === "Send Back").length,
                rejectedCount: aRequests.filter(r => r.status === "Rejected").length,
                inProgressCount: aRequests.filter(r => r.status === "Pending Request").length,
                allCount: aRequests.length
            };
            
            oModel.setProperty("/draftCount", oCounts.draftCount);
            oModel.setProperty("/sentBackCount", oCounts.sentBackCount);
            oModel.setProperty("/rejectedCount", oCounts.rejectedCount);
            oModel.setProperty("/inProgressCount", oCounts.inProgressCount);
            oModel.setProperty("/allCount", oCounts.allCount);
        },

        onTabSelect: function(oEvent) {
            const sKey = oEvent.getParameter("key");
            const oTable = this.byId("dashboardTable");
            const oBinding = oTable.getBinding("items");
            oBinding.filter([]);
            MessageToast.show(`Selected tab: ${sKey}`);
        },

        onDetailsTabSelect: function(oEvent) {
            const sKey = oEvent.getParameter("key");
            MessageToast.show(`Selected details tab: ${sKey}`);
        }
    });
});




UPDATED CONTROLLER.JS CODE 

sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/format/DateFormat"
], function (Controller, MessageBox, MessageToast, JSONModel, Filter, FilterOperator, DateFormat) {
    "use strict";

    return Controller.extend("com.tableentry.tablestructure.controller.Table_Entry", {
        onInit: function () {
            const oData = {
                draftCount: 0,
                sentBackCount: 1,
                rejectedCount: 1,
                inProgressCount: 2,
                allCount: 4,
                editable: false,
                filter: {
                    requestNo: "",
                    createdBy: "",
                    createdOn: "",
                    status: ""
                },
                statusItems: [
                    { key: "", text: "All" },
                    { key: "Draft", text: "Draft" },
                    { key: "Send Back", text: "Send Back" },
                    { key: "Rejected", text: "Rejected" },
                    { key: "Pending Request", text: "Pending Request" }
                ],
                requestTypes: [
                    { key: "TYPE1", text: "Type 1 Request" },
                    { key: "TYPE2", text: "Type 2 Request" },
                    { key: "TYPE3", text: "Type 3 Request" }
                ],
                newRequest: {
                    type: "",
                    description: "",
                    file: null
                },
                uploadedFiles: [
                    {
                        fileName: "PDF for justification - Email"
                    }
                ],
                uploadedFilesCount: 1,
                requests: [
                    { 
                        requestNo: "RM00000001",
                        createdBy: "Buyer",
                        createdOn: "Feb 02, 2025",
                        status: "Send Back",
                        remarks: "-",
                        pendingWith: "-",
                        requestAging: "15 Days",
                        referenceNo: "RM00000001",
                        division: "Division 1",
                        dcnrForm: "Form 123",
                        standardReason: "Price Change",
                        salesGroup: "Group A",
                        creatorComment: "Initial request",
                        dcnrTo: "Finance"
                    },
                    { 
                        requestNo: "RM00000002",
                        createdBy: "Buyer",
                        createdOn: "Feb 02, 2025",
                        status: "Send Back",
                        remarks: "-",
                        pendingWith: "-",
                        requestAging: "15 Days",
                        referenceNo: "RM00000002",
                        division: "Division 1",
                        dcnrForm: "Form 123",
                        standardReason: "Price Change",
                        salesGroup: "Group A",
                        creatorComment: "Initial request",
                        dcnrTo: "Finance"
                    },
                    { 
                        requestNo: "RM00000003",
                        createdBy: "Buyer",
                        createdOn: "Feb 02, 2025",
                        status: "Send Back",
                        remarks: "-",
                        pendingWith: "-",
                        requestAging: "15 Days",
                        referenceNo: "RM00000003",
                        division: "Division 1",
                        dcnrForm: "Form 123",
                        standardReason: "Price Change",
                        salesGroup: "Group A",
                        creatorComment: "Initial request",
                        dcnrTo: "Finance"
                    },
                    { 
                        requestNo: "RM00000004",
                        createdBy: "Buyer",
                        createdOn: "Feb 02, 2025",
                        status: "Send Back",
                        remarks: "-",
                        pendingWith: "-",
                        requestAging: "15 Days",
                        referenceNo: "RM00000004",
                        division: "Division 1",
                        dcnrForm: "Form 123",
                        standardReason: "Price Change",
                        salesGroup: "Group A",
                        creatorComment: "Initial request",
                        dcnrTo: "Finance"
                    },
                    { 
                        requestNo: "RM00000005",
                        createdBy: "Buyer",
                        createdOn: "Feb 02, 2025",
                        status: "Pending Request",
                        remarks: "-",
                        pendingWith: "user3@pellme.com",
                        requestAging: "15 Days",
                        referenceNo: "RM00000005",
                        division: "Division 2",
                        dcnrForm: "Form 456",
                        standardReason: "New Product",
                        salesGroup: "Group B",
                        creatorComment: "Urgent request",
                        dcnrTo: "Sales"
                    }
                ],
                approvers: [
                    {
                        role1: "Approver 1",
                        approver1: "ayush.jha@sumo",
                        role2: "Alternate Approver 1",
                        approver2: "tani.singh@sumo"
                    },
                    {
                        role1: "Approver 2",
                        approver1: "ayushi.khanolkar@sumo",
                        role2: "Alternate Approver 2",
                        approver2: "aakib.mohd@sumo"
                    },
                    {
                        role1: "Approver 3",
                        approver1: "yugal.kishore@sumo",
                        role2: "Alternate Approver 3",
                        approver2: "sumit.jhadjiyal@sumo"
                    }
                ],
                timelineItems: [
                    {
                        dateTime: "7/22/2016 at 3:00 PM",
                        title: "John Miller added a note",
                        text: "Sample Text for a note type item. Lorem ipsumlor sit amet.",
                        userName: "John Miller",
                        userPicture: "https://ui-avatars.com/api/?name=John+Miller"
                    },
                    {
                        dateTime: "7/22/2016 at 2:56 PM",
                        title: "John Miller added a call log",
                        text: "Sample Text for a note type item. Lorem ipsumlor sit amet.",
                        userName: "John Miller",
                        userPicture: "https://ui-avatars.com/api/?name=John+Miller"
                    },
                    {
                        dateTime: "6/20/2016 at 5:32 PM",
                        title: "Denise Smith added an invoice",
                        text: "INVOICE (37483)\n199.00 USD\nOverdue\nOPEN IN MANAGE INVOICES APP",
                        userName: "Denise Smith",
                        userPicture: "https://ui-avatars.com/api/?name=Denise+Smith"
                    },
                    {
                        dateTime: "7/14/2016 at 12:41 AM",
                        title: "Denise Smith",
                        text: "Lorem ipsum dolor sit amet, elit. Aeneancommodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec.\nMARK AS INAPPROPRIATE",
                        userName: "Denise Smith",
                        userPicture: "https://ui-avatars.com/api/?name=Denise+Smith"
                    },
                    {
                        dateTime: "7/14/2016 at 11:14 PM",
                        title: "Michael Adams",
                        text: "Maecenas nec odio et ante tincidunt. Donec vitae sapien ut libero venenatis faucibus. Nulla quis ante. Etiam sit amet orci eget eros faucibus tincidunt.\nMARK AS INAPPROPRIATE",
                        userName: "Michael Adams",
                        userPicture: "https://ui-avatars.com/api/?name=Michael+Adams"
                    },
                    {
                        dateTime: "7/14/2016 at 10:37 AM",
                        title: "Denise Smith updated profitability to 75%",
                        text: "Probably from 50% to 75%\nSales Lead (46115162342)\nDelBolt Industries\nOPEN IN MY LEADS APP",
                        userName: "Denise Smith",
                        userPicture: "https://ui-avatars.com/api/?name=Denise+Smith"
                    },
                    {
                        dateTime: "7/14/2016 at 1:59 PM",
                        title: "John Miller",
                        text: "Donec quam felis, ultricies nec, pellentesque eu. Nulla consequat massa quis enim. Donec pede justo, fringilla vel. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus.",
                        userName: "John Miller",
                        userPicture: "https://ui-avatars.com/api/?name=John+Miller"
                    },
                    {
                        dateTime: "7/14/2016 at 11:00 PM",
                        title: "Outlook task",
                        text: "Quisque rutrum. Aenean imperdiet. Etiam ultricies nisin, dapibus dictum.\nCurabitur ullamcorper ultricies nisin.",
                        userName: "Outlook Task",
                        userPicture: "https://ui-avatars.com/api/?name=Outlook+Task"
                    }
                ],
                priceDetails: [
                    {
                        material: "",
                        priceList: "",
                        priceListDescription: "",
                        uom: "",
                        indicativeMRP: "",
                        startDate: "",
                        endDate: "",
                        defaultPrice: ""
                    }
                ],
                selectedRequest: {}
            };

            const oModel = new JSONModel(oData);
            this.getView().setModel(oModel);
            this._updateCounts();
        },

        onTilePress: function(oEvent) {
            const sHeader = oEvent.getSource().getHeader();
            const oTable = this.byId("dashboardTable");
            const oBinding = oTable.getBinding("items");
            
            let aFilters = [];
            switch(sHeader) {
                case "My Draft Requests":
                    aFilters.push(new Filter("status", FilterOperator.EQ, "Draft"));
                    break;
                case "Sent Back Requests":
                    aFilters.push(new Filter("status", FilterOperator.EQ, "Send Back"));
                    break;
                case "Rejected Requests":
                    aFilters.push(new Filter("status", FilterOperator.EQ, "Rejected"));
                    break;
                case "In-Progress Requests":
                    aFilters.push(new Filter("status", FilterOperator.EQ, "Pending Request"));
                    break;
            }
            
            oBinding.filter(aFilters);
            MessageToast.show(`Filtered by ${sHeader}`);
        },

        onFilterChange: function() {
            const oTable = this.byId("dashboardTable");
            const oBinding = oTable.getBinding("items");
            const oModel = this.getView().getModel();
            const oFilters = oModel.getProperty("/filter");
            
            let aFilters = [];
            
            if (oFilters.requestNo) {
                aFilters.push(new Filter("requestNo", FilterOperator.Contains, oFilters.requestNo));
            }
            
            if (oFilters.createdBy) {
                aFilters.push(new Filter("createdBy", FilterOperator.Contains, oFilters.createdBy));
            }
            
            if (oFilters.createdOn) {
                aFilters.push(new Filter("createdOn", FilterOperator.EQ, oFilters.createdOn));
            }
            
            if (oFilters.status) {
                aFilters.push(new Filter("status", FilterOperator.EQ, oFilters.status));
            }
            
            oBinding.filter(aFilters);
        },

        onClearFilters: function() {
            const oModel = this.getView().getModel();
            oModel.setProperty("/filter", {
                requestNo: "",
                createdBy: "",
                createdOn: "",
                status: ""
            });
            
            this.onFilterChange();
            MessageToast.show("Filters cleared");
        },

        onCreatePress: function() {
            this.getView().getModel().setProperty("/newRequest", {
                type: "",
                description: "",
                file: null
            });
            
            this.byId("createRequestDialog").open();
        },

        onCreateRequest: function() {
            const oModel = this.getView().getModel();
            const oNewRequest = oModel.getProperty("/newRequest");
            
            const aRequests = oModel.getProperty("/requests");
            const iNewId = aRequests.length + 1;
            const sNewRequestNo = "RM" + String(iNewId).padStart(7, "0");
            
            const oDateFormat = DateFormat.getDateInstance({style: "medium"});
            const sCurrentDate = oDateFormat.format(new Date());
            
            const oRequest = {
                requestNo: sNewRequestNo,
                createdBy: "Current User",
                createdOn: sCurrentDate,
                status: "Draft",
                remarks: oNewRequest.description || "-",
                pendingWith: "-",
                requestAging: "0 Days",
                referenceNo: sNewRequestNo,
                division: "",
                dcnrForm: "",
                standardReason: "",
                salesGroup: "",
                creatorComment: "",
                dcnrTo: ""
            };
            
            aRequests.unshift(oRequest);
            oModel.setProperty("/requests", aRequests);
            
            this._updateCounts();
            
            this.byId("createRequestDialog").close();
            MessageToast.show("Request created successfully");
            
            oModel.setProperty("/selectedRequest", JSON.parse(JSON.stringify(oRequest)));
            
            // Open the request details in a new tab
            const oDialog = this.byId("requestDetailsDialog");
            const oDialogContent = oDialog.getContent()[0]; // Get the panel inside the dialog
            
            // Create a new window
            const oNewWindow = window.open("", "_blank");
            
            // Write the dialog content to the new window
            oNewWindow.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Price Requisition</title>
                    <script src="https://sapui5.hana.ondemand.com/resources/sap-ui-core.js"
                            id="sap-ui-bootstrap"
                            data-sap-ui-libs="sap.m, sap.ui.layout, sap.suite.ui.commons"
                            data-sap-ui-theme="sap_fiori_3">
                    </script>
                    <style>
                        .sapUiBody {
                            padding: 1rem;
                        }
                    </style>
                </head>
                <body class="sapUiBody">
                    <div id="content"></div>
                    <script>
                        sap.ui.getCore().attachInit(function() {
                            new sap.m.Shell({
                                app: new sap.ui.core.ComponentContainer({
                                    name: "com.tableentry.tablestructure"
                                })
                            }).placeAt("content");
                        });
                    </script>
                </body>
                </html>
            `);
            
            // Attach the dialog content to the new window (simplified for this example)
            oNewWindow.document.getElementById("content").innerHTML = oDialogContent.getDomRef().outerHTML;
        },

        onCancelCreate: function() {
            this.byId("createRequestDialog").close();
        },

        onItemPress: function(oEvent) {
            const oItem = oEvent.getParameter("listItem");
            const oContext = oItem.getBindingContext();
            const oData = oContext.getObject();
            
            const oSelectedRequest = JSON.parse(JSON.stringify(oData));
            this.getView().getModel().setProperty("/selectedRequest", oSelectedRequest);
            
            this.getView().byId("requestDetailsDialog").open();
        },

        onSaveRequest: function() {
            const oModel = this.getView().getModel();
            const oSelectedRequest = oModel.getProperty("/selectedRequest");
            
            const aRequests = oModel.getProperty("/requests");
            const iIndex = aRequests.findIndex(req => req.requestNo === oSelectedRequest.requestNo);
            if (iIndex >= 0) {
                aRequests[iIndex] = oSelectedRequest;
                oModel.setProperty("/requests", aRequests);
            }
            
            MessageToast.show("Request saved successfully");
        },

        onSubmitRequest: function() {
            const oModel = this.getView().getModel();
            const oSelectedRequest = oModel.getProperty("/selectedRequest");
            
            oSelectedRequest.status = "Pending Request";
            oSelectedRequest.pendingWith = "next-approver@example.com";
            
            const aRequests = oModel.getProperty("/requests");
            const iIndex = aRequests.findIndex(req => req.requestNo === oSelectedRequest.requestNo);
            if (iIndex >= 0) {
                aRequests[iIndex] = oSelectedRequest;
                oModel.setProperty("/requests", aRequests);
            }
            
            this._updateCounts();
            oModel.setProperty("/editable", false);
            MessageToast.show("Request submitted successfully");
            this.getView().byId("requestDetailsDialog").close();
        },

        onPrintRequest: function() {
            MessageToast.show("Printing request...");
        },

        onCloseRequest: function() {
            const oModel = this.getView().getModel();
            oModel.setProperty("/editable", false);
            this.getView().byId("requestDetailsDialog").close();
        },

        onEditRequest: function() {
            const oModel = this.getView().getModel();
            const bEditable = !oModel.getProperty("/editable");
            oModel.setProperty("/editable", bEditable);
            MessageToast.show(bEditable ? "Edit mode activated" : "Edit mode deactivated");
        },

        handleUploadComplete: function(oEvent) {
            const sResponse = oEvent.getParameters().response;
            const iHttpStatusCode = parseInt(/\d{3}/.exec(sResponse) ? /\d{3}/.exec(sResponse)[0] : 0);
            const sMessage = iHttpStatusCode === 200 ? "File upload complete (Success)" : "File upload failed (Error)";
            MessageToast.show(sMessage);
        },

        handleValueChange: function(oEvent) {
            const sFileName = oEvent.getParameter("newValue");
            const oModel = this.getView().getModel();
            const aUploadedFiles = oModel.getProperty("/uploadedFiles");
            aUploadedFiles.push({ fileName: sFileName });
            oModel.setProperty("/uploadedFiles", aUploadedFiles);
            oModel.setProperty("/uploadedFilesCount", aUploadedFiles.length);
            MessageToast.show("File selected: " + sFileName);
        },

        onDownloadFile: function(oEvent) {
            const oItem = oEvent.getSource().getBindingContext().getObject();
            MessageToast.show("Downloading file: " + oItem.fileName);
            // In a real application, you would implement the actual download logic here
        },

        handleTypeMissmatch: function(oEvent) {
            const aFileTypes = oEvent.getSource().getFileType().map(sType => "*." + sType);
            MessageToast.show(`The file type *.${oEvent.getParameter("fileType")} is not supported. Choose one of the following types: ${aFileTypes.join(", ")}`);
        },

        _updateCounts: function() {
            const oModel = this.getView().getModel();
            const aRequests = oModel.getProperty("/requests");
            
            const oCounts = {
                draftCount: aRequests.filter(r => r.status === "Draft").length,
                sentBackCount: aRequests.filter(r => r.status === "Send Back").length,
                rejectedCount: aRequests.filter(r => r.status === "Rejected").length,
                inProgressCount: aRequests.filter(r => r.status === "Pending Request").length,
                allCount: aRequests.length
            };
            
            oModel.setProperty("/draftCount", oCounts.draftCount);
            oModel.setProperty("/sentBackCount", oCounts.sentBackCount);
            oModel.setProperty("/rejectedCount", oCounts.rejectedCount);
            oModel.setProperty("/inProgressCount", oCounts.inProgressCount);
            oModel.setProperty("/allCount", oCounts.allCount);
        },

        onTabSelect: function(oEvent) {
            const sKey = oEvent.getParameter("key");
            const oTable = this.byId("dashboardTable");
            const oBinding = oTable.getBinding("items");
            oBinding.filter([]);
            MessageToast.show(`Selected tab: ${sKey}`);
        },

        onDetailsTabSelect: function(oEvent) {
            const sKey = oEvent.getParameter("key");
            MessageToast.show(`Selected details tab: ${sKey}`);
        }
    });
});







CONTROLLER.JS
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/format/DateFormat"
], function (Controller, MessageBox, MessageToast, JSONModel, Filter, FilterOperator, DateFormat) {
    "use strict";

    return Controller.extend("com.tableentry.tablestructure.controller.Table_Entry", {
        onInit: function () {
            const oData = {
                draftCount: 0,
                sentBackCount: 1,
                rejectedCount: 1,
                inProgressCount: 2,
                allCount: 4,
                editable: false,
                filter: {
                    requestNo: "",
                    createdBy: "",
                    createdOn: "",
                    status: ""
                },
                statusItems: [
                    { key: "", text: "All" },
                    { key: "Draft", text: "Draft" },
                    { key: "Send Back", text: "Send Back" },
                    { key: "Rejected", text: "Rejected" },
                    { key: "Pending Request", text: "Pending Request" }
                ],
                requestTypes: [
                    { key: "TYPE1", text: "Type 1 Request" },
                    { key: "TYPE2", text: "Type 2 Request" },
                    { key: "TYPE3", text: "Type 3 Request" }
                ],
                newRequest: {
                    type: "",
                    description: "",
                    file: null
                },
                requests: [
                    { 
                        requestNo: "RAM00000001",
                        createdBy: "Buyer",
                        createdOn: "Feb 02, 2025",
                        status: "Send Back",
                        remarks: "-",
                        pendingWith: "-",
                        requestAging: "15 Days",
                        comments: []
                    },
                    { 
                        requestNo: "RAM00000002",
                        createdBy: "Buyer",
                        createdOn: "Feb 02, 2025",
                        status: "Pending Request",
                        remarks: "-",
                        pendingWith: "user3@pellme.com",
                        requestAging: "15 Days",
                        comments: []
                    },
                    { 
                        requestNo: "RAM00000003",
                        createdBy: "Buyer",
                        createdOn: "Feb 02, 2025",
                        status: "Rejected",
                        remarks: "-",
                        pendingWith: "-",
                        requestAging: "15 Days",
                        comments: []
                    },
                    { 
                        requestNo: "RAM00000004",
                        createdBy: "Buyer",
                        createdOn: "Feb 02, 2025",
                        status: "Pending Request",
                        remarks: "-",
                        pendingWith: "user2@pellme.com",
                        requestAging: "15 Days",
                        comments: []
                    }
                ],
                selectedRequest: {},
                newComment: ""
            };

            const oModel = new JSONModel(oData);
            this.getView().setModel(oModel);
            this._updateCounts();
        },

        onTilePress: function(oEvent) {
            const sHeader = oEvent.getSource().getHeader();
            const oTable = this.byId("dashboardTable");
            const oBinding = oTable.getBinding("items");
            
            let aFilters = [];
            switch(sHeader) {
                case "My Draft Requests":
                    aFilters.push(new Filter("status", FilterOperator.EQ, "Draft"));
                    break;
                case "Sent Back Requests":
                    aFilters.push(new Filter("status", FilterOperator.EQ, "Send Back"));
                    break;
                case "Rejected Requests":
                    aFilters.push(new Filter("status", FilterOperator.EQ, "Rejected"));
                    break;
                case "In-Progress Requests":
                    aFilters.push(new Filter("status", FilterOperator.EQ, "Pending Request"));
                    break;
            }
            
            oBinding.filter(aFilters);
            MessageToast.show(`Filtered by ${sHeader}`);
        },

        onFilterChange: function() {
            const oTable = this.byId("dashboardTable");
            const oBinding = oTable.getBinding("items");
            const oModel = this.getView().getModel();
            const oFilters = oModel.getProperty("/filter");
            
            let aFilters = [];
            
            if (oFilters.requestNo) {
                aFilters.push(new Filter("requestNo", FilterOperator.Contains, oFilters.requestNo));
            }
            
            if (oFilters.createdBy) {
                aFilters.push(new Filter("createdBy", FilterOperator.Contains, oFilters.createdBy));
            }
            
            if (oFilters.createdOn) {
                aFilters.push(new Filter("createdOn", FilterOperator.EQ, oFilters.createdOn));
            }
            
            if (oFilters.status) {
                aFilters.push(new Filter("status", FilterOperator.EQ, oFilters.status));
            }
            
            oBinding.filter(aFilters);
        },

        onClearFilters: function() {
            const oModel = this.getView().getModel();
            oModel.setProperty("/filter", {
                requestNo: "",
                createdBy: "",
                createdOn: "",
                status: ""
            });
            
            this.onFilterChange();
            MessageToast.show("Filters cleared");
        },

        onCreatePress: function() {
            this.getView().getModel().setProperty("/newRequest", {
                type: "",
                description: "",
                file: null
            });
            
            this.byId("createRequestDialog").open();
        },

        onCreateRequest: function() {
            const oModel = this.getView().getModel();
            const oNewRequest = oModel.getProperty("/newRequest");
            
            if (!oNewRequest.type) {
                MessageToast.show("Please select a request type");
                return;
            }
            
            const aRequests = oModel.getProperty("/requests");
            const iNewId = aRequests.length + 1;
            const sNewRequestNo = "RAM" + String(iNewId).padStart(7, "0");
            
            const oDateFormat = DateFormat.getDateInstance({style: "medium"});
            const sCurrentDate = oDateFormat.format(new Date());
            
            const oRequest = {
                requestNo: sNewRequestNo,
                createdBy: "Current User",
                createdOn: sCurrentDate,
                status: "Draft",
                remarks: oNewRequest.description || "-",
                pendingWith: "-",
                requestAging: "0 Days",
                comments: []
            };
            
            aRequests.unshift(oRequest);
            oModel.setProperty("/requests", aRequests);
            
            this._updateCounts();
            
            this.byId("createRequestDialog").close();
            MessageToast.show("Request created successfully");
            
            // Open the form data in a new tab
            this.openFormInNewTab(oNewRequest, oRequest);
            
            oModel.setProperty("/selectedRequest", JSON.parse(JSON.stringify(oRequest)));
            this.byId("requestDetailsDialog").open();
        },

        openFormInNewTab: function(oNewRequest, oSelectedRequest) {
            const sRequestType = oNewRequest.type ? this.getView().getModel().getProperty(`/requestTypes/${oNewRequest.type}/text`) : "";
            const sDescription = oNewRequest.description || "";
            const sFileName = oNewRequest.file || "";
            const sRequestNo = oSelectedRequest.requestNo || "";
            const sCreatedBy = oSelectedRequest.createdBy || "Current User";
            const sCreatedDate = oSelectedRequest.createdOn || new Date().toLocaleDateString();
            const sStatus = oSelectedRequest.status || "Draft";

            const sHtmlContent = `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Price Requisition</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; }
                        .header { background-color: #003087; color: white; padding: 10px; display: flex; justify-content: space-between; align-items: center; }
                        .header img { height: 40px; }
                        .header .title { margin: 0; }
                        .container { border: 2px solid #003087; padding: 20px; margin-top: 10px; }
                        .mandatory { color: red; font-size: 12px; }
                        .form-group { margin-bottom: 10px; }
                        .form-group label { margin-right: 10px; }
                        .form-group input { padding: 5px; width: 200px; }
                        .table-section { margin-top: 20px; }
                        table { width: 100%; border-collapse: collapse; }
                        table, th, td { border: 1px solid #ccc; }
                        th, td { padding: 10px; text-align: left; }
                        th { background-color: #f2f2f2; }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN4zI47qvXfN00zC2FBC8aRP0kB6wtIcWTRQ" alt="Logo">
                        <h2 class="title">Price Requisition</h2>
                        <div>Home</div>
                    </div>
                    <div class="container">
                        <h3>Price Requisition Details</h3>
                        <p class="mandatory">Fields marked with * are mandatory</p>
                        <div class="form-group">
                            <label>Reference No:*</label><input type="text" value="${sRequestNo}" readonly>
                            <label>Created By:</label><input type="text" value="${sCreatedBy}" readonly>
                        </div>
                        <div class="form-group">
                            <label>Division:*</label><input type="text" value="${sRequestType}" readonly>
                            <label>Created Date:</label><input type="text" value="${sCreatedDate}" readonly>
                        </div>
                        <div class="form-group">
                            <label>DCNR# form:</label><input type="text" value="" readonly>
                            <label>Status of the Request:</label><input type="text" value="${sStatus}" readonly>
                        </div>
                        <div class="form-group">
                            <label>Standard Reason:</label><input type="text" value="${sDescription}" readonly>
                            <label>Sales Group:</label><input type="text" value="" readonly>
                        </div>
                        <div class="form-group">
                            <label>Comment by Creator:</label><input type="text" value="" readonly>
                            <label>DCNR to:</label><input type="text" value="${sFileName}" readonly>
                        </div>
                        <div class="table-section">
                            <h3>Division Section Table</h3>
                            <table>
                                <tr>
                                    <th>Role</th>
                                    <th>Approver</th>
                                    <th>Role</th>
                                    <th>Approver</th>
                                </tr>
                                <tr>
                                    <td>Approver 1</td>
                                    <td><input type="text" value="ayush.jha@sumo" readonly></td>
                                    <td>Alternate Approver 1</td>
                                    <td><input type="text" value="tani.singh@sumo" readonly></td>
                                </tr>
                                <tr>
                                    <td>Approver 2</td>
                                    <td><input type="text" value="ayushi.khanolkar@sumo" readonly></td>
                                    <td>Alternate Approver 2</td>
                                    <td><input type="text" value="aakib.mohd@sumo" readonly></td>
                                </tr>
                                <tr>
                                    <td>Approver 3</td>
                                    <td><input type="text" value="yugal.kishore@sumo" readonly></td>
                                    <td>Alternate Approver 3</td>
                                    <td><input type="text" value="sumit.jhadjiyal@sumo" readonly></td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </body>
                </html>
            `;

            const oNewTab = window.open('', '_blank');
            oNewTab.document.write(sHtmlContent);
            oNewTab.document.close();
        },

        onCancelCreate: function() {
            this.byId("createRequestDialog").close();
        },

        onItemPress: function(oEvent) {
            const oItem = oEvent.getParameter("listItem");
            const oContext = oItem.getBindingContext();
            const oData = oContext.getObject();
            
            const oSelectedRequest = JSON.parse(JSON.stringify(oData));
            this.getView().getModel().setProperty("/selectedRequest", oSelectedRequest);
            
            this.getView().byId("requestDetailsDialog").open();
        },

        onSaveRequest: function() {
            const oModel = this.getView().getModel();
            const oSelectedRequest = oModel.getProperty("/selectedRequest");
            
            const aRequests = oModel.getProperty("/requests");
            const iIndex = aRequests.findIndex(req => req.requestNo === oSelectedRequest.requestNo);
            if (iIndex >= 0) {
                aRequests[iIndex] = oSelectedRequest;
                oModel.setProperty("/requests", aRequests);
            }
            
            MessageToast.show("Request saved successfully");
        },

        onSubmitRequest: function() {
            const oModel = this.getView().getModel();
            const oSelectedRequest = oModel.getProperty("/selectedRequest");
            
            oSelectedRequest.status = "Pending Request";
            oSelectedRequest.pendingWith = "next-approver@example.com";
            
            const aRequests = oModel.getProperty("/requests");
            const iIndex = aRequests.findIndex(req => req.requestNo === oSelectedRequest.requestNo);
            if (iIndex >= 0) {
                aRequests[iIndex] = oSelectedRequest;
                oModel.setProperty("/requests", aRequests);
            }
            
            this._updateCounts();
            oModel.setProperty("/editable", false);
            MessageToast.show("Request submitted successfully");
            this.getView().byId("requestDetailsDialog").close();
        },

        onPrintRequest: function() {
            const oSelectedRequest = this.getView().getModel().getProperty("/selectedRequest");
            const sContent = `
                Request: ${oSelectedRequest.requestNo}
                Created By: ${oSelectedRequest.createdBy}
                Created On: ${oSelectedRequest.createdOn}
                Status: ${oSelectedRequest.status}
                Remarks: ${oSelectedRequest.remarks}
                Pending With: ${oSelectedRequest.pendingWith}
                Request Aging: ${oSelectedRequest.requestAging}
            `;
            const oPrintWindow = window.open("", "_blank");
            oPrintWindow.document.write(`<pre>${sContent}</pre>`);
            oPrintWindow.document.close();
            oPrintWindow.print();
            MessageToast.show("Printing request...");
        },

        onCloseRequest: function() {
            const oModel = this.getView().getModel();
            oModel.setProperty("/editable", false);
            this.getView().byId("requestDetailsDialog").close();
        },

        onEditRequest: function() {
            const oModel = this.getView().getModel();
            const bEditable = !oModel.getProperty("/editable");
            oModel.setProperty("/editable", bEditable);
            MessageToast.show(bEditable ? "Edit mode activated" : "Edit mode deactivated");
        },

        onAddComment: function() {
            const oModel = this.getView().getModel();
            const sNewComment = oModel.getProperty("/newComment");
            
            if (!sNewComment) {
                MessageToast.show("Please enter a comment");
                return;
            }
            
            const oSelectedRequest = oModel.getProperty("/selectedRequest");
            if (!oSelectedRequest.comments) {
                oSelectedRequest.comments = [];
            }
            
            const oDateFormat = DateFormat.getDateTimeInstance({style: "medium"});
            const sTimestamp = oDateFormat.format(new Date());
            
            oSelectedRequest.comments.push({
                user: "Current User",
                comment: sNewComment,
                timestamp: sTimestamp
            });
            
            oModel.setProperty("/selectedRequest/comments", oSelectedRequest.comments);
            oModel.setProperty("/newComment", "");
            MessageToast.show("Comment added");
        },

        onTabSelect: function(oEvent) {
            const sKey = oEvent.getParameter("key");
            const oTable = this.byId("dashboardTable");
            const oBinding = oTable.getBinding("items");
            oBinding.filter([]);
            MessageToast.show(`Selected tab: ${sKey}`);
        },

        onDetailsTabSelect: function(oEvent) {
            const sKey = oEvent.getParameter("key");
            MessageToast.show(`Selected details tab: ${sKey}`);
        },

        handleUploadComplete: function(oEvent) {
            const sResponse = oEvent.getParameters().response;
            const iHttpStatusCode = parseInt(/\d{3}/.exec(sResponse) ? /\d{3}/.exec(sResponse)[0] : 0);
            const sMessage = iHttpStatusCode === 200 ? "File upload complete (Success)" : "File upload failed (Error)";
            MessageToast.show(sMessage);
        },

        handleUploadPress: function() {
            const oFileUploader = this.byId("fileUploader");
            if (!oFileUploader.getValue()) {
                MessageToast.show("Choose a file first");
                return;
            }
            oFileUploader.checkFileReadable().then(function() {
                oFileUploader.upload();
            }, function(error) {
                MessageToast.show("The file cannot be read. It may have changed.");
            }).then(function() {
                oFileUploader.clear();
            });
        },

        handleTypeMissmatch: function(oEvent) {
            const aFileTypes = oEvent.getSource().getFileType().map(sType => "*." + sType);
            MessageToast.show(`The file type *.${oEvent.getParameter("fileType")} is not supported. Choose one of the following types: ${aFileTypes.join(", ")}`);
        },

        handleValueChange: function(oEvent) {
            const sFileName = oEvent.getParameter("newValue");
            const oModel = this.getView().getModel();
            oModel.setProperty("/newRequest/file", sFileName);
            MessageToast.show("File selected: " + sFileName);
        },

        _updateCounts: function() {
            const oModel = this.getView().getModel();
            const aRequests = oModel.getProperty("/requests");
            
            const oCounts = {
                draftCount: aRequests.filter(r => r.status === "Draft").length,
                sentBackCount: aRequests.filter(r => r.status === "Send Back").length,
                rejectedCount: aRequests.filter(r => r.status === "Rejected").length,
                inProgressCount: aRequests.filter(r => r.status === "Pending Request").length,
                allCount: aRequests.length
            };
            
            oModel.setProperty("/draftCount", oCounts.draftCount);
            oModel.setProperty("/sentBackCount", oCounts.sentBackCount);
            oModel.setProperty("/rejectedCount", oCounts.rejectedCount);
            oModel.setProperty("/inProgressCount", oCounts.inProgressCount);
            oModel.setProperty("/allCount", oCounts.allCount);
        }
    });
});
