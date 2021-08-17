from __future__ import unicode_literals

import frappe;

@frappe.whitelist()
def get_data():
  data = frappe.db.get_list('Logistics',
    fields=['projectname', 'location', 'date', 'coordinate'],
    as_list=True)
  return data

@frappe.whitelist()
def get_list():
  groupList = frappe.db.get_list('Logistics Group',
    fields = ['Name'],
    as_list=True)
  return groupList

@frappe.whitelist()
def filterList(groupName):
  newData = []
  allData = frappe.db.get_list('Logistics',
    fields = ['projectname','location', 'date', 'coordinate', 'group'],
    as_list=True)
  for g in allData:
    if g[4] == groupName:
      print(g)
      newData.append(g)
  newData = list(newData)
  return newData