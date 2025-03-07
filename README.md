# ip-to-decimal-gsheets
Convert IPv4 and IPv6 addresses in Google Sheets

## Sharing

- Deployment ID: `AKfycbxuOVlvprc8wf7oCOTogJTMQBI0l1kbH7Udh_4kHD9eNKVj1rVX1ye_bfv0ql6NhimUGQ`
- Library URL: https://script.google.com/macros/library/d/1ayTpyRrWXct74GQNa4-p9oW6nCAzrrmvtVC5GmyT82WsnjLrwdqloKD_/5
- Demo Sheet: https://docs.google.com/spreadsheets/d/1ox1HSb2Xw28ZYi0MWkU5O-ixZthVWuH6IBk6oJJh61U/edit?usp=sharing

## Setup (manual).

- Import this as an Apps Script (extensions menu) in Google Sheets.
- Save it as a Library.

## Usage.

- In a sheet with it imported, use

```
=IPV4TODECIMAL("192.0.2.1")
=IPV6TODECIMAL("2001:db8::1")
```
