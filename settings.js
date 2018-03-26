module.exports = {
   address: '0xbb9bc244d798123fde783fcc1c72d3bb8c189413', //REQUIRED //TheDao See: https://etherscan.io/address/0xbb9bc244d798123fde783fcc1c72d3bb8c189413
   action: '', //'txlist', | txlistinternal'; transaction type; !default txlist
   startblock: '', //ex: 0; blank for default
   endblock: '', //ex 99999999; ; blank for default
   page: '', //Depends on offset; ex: 1; blank for default
   offset: '', //Depends on page; ex: 10; blank for default
   sortOrder: '', //'asc|desc'; !default: asc
   apikey: '', //YourApiKeyToken //blank for none
   outputFileNamePrepend: '' //text to prepend tou output file name
}
