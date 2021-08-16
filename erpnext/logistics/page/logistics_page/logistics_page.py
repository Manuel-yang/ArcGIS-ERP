from __future__ import unicode_literals

import frappe;

@frappe.whitelist()
def get_data():
  data = frappe.db.get_list('Logistics',
    fields=['projectname', 'location', 'date', 'coordinate'],
    as_list=True)
  return data