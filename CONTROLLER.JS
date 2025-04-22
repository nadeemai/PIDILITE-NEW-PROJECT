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
            
            // Open the application in a new tab
            window.open(window.location.href, '_blank');
            
            oModel.setProperty("/selectedRequest", JSON.parse(JSON.stringify(oRequest)));
            this.byId("requestDetailsDialog").open();
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
