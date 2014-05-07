// lib/views.js

exports.models = {
  map: function (doc) {
    if( 'model' == doc.type ) {
      emit(doc, null);
    }
  }
	//, reduce: function (key, values, rereduce) { return sum(values); }
};

exports.levels = {
  map: function (doc) { if( 'level' == doc.type ) { emit(doc, null); } }
};

exports.rooms = {
  map: function (doc) { if( 'room' == doc.type ) { emit(doc, null); } }
};

exports.furniture = {
  map: function (doc) { if( 'furniture' == doc.type ) { emit(doc, null); } }
};

exports.symbols = {
  map: function (doc) { if( 'symbol' == doc.type ) { emit(doc._id, doc); } }
};

exports.map_room_to_furniture = {
  map: function (doc) {
    if( 'furniture' == doc.type ) {
      emit( doc.roomId, doc );
    }
  }
};

exports.map_level_to_room = {
  map: function (doc) { if( 'room' == doc.type ) { emit(doc.levelId, doc); } }
};

exports.map_model_to_level = {
  map: function (doc) { if( 'level' == doc.type ) { emit(doc.modelId, doc); } }
};

exports.map_model_to_level_and_sheet = {
  map: function (doc) { if( 'level' == doc.type || 'sheet' == doc.type ) { emit(doc.modelId, doc); } }
};

exports.map_sheet_to_view = {
  map: function (doc) { if( 'view' == doc.type ) { emit(doc.sheetId, doc); } }
};

exports.map_view_to_bimel = {
  map: function (doc) {
    if( 'part' == doc.type || 'furniture' == doc.type ) {
      vids = doc.viewIds;
      var n = vids.length;
      for( var i = 0; i < n; ++i ) {
        emit(vids[i], doc);
      }
    }
  }
};

//// http://stackoverflow.com/questions/5276077/how-can-i-access-related-documents-within-the-map-function-in-couchdb
//// requires ?include_docs=true
//
//// this does not work:
//
//exports.map_room_to_furniture_plus_symbol = {
//  map: function (doc) {
//    if( 'furniture' == doc.type ) {
//      emit(doc.roomId, {_id: doc.symbolId, instance: doc});
//    }
//  }
//};
//
//// this does work, but using the 'symbols' view with a list of specific keys is simpler:
//
//exports.map_furniture_to_symbol = {
//  map: function( doc ) {
//    if( 'furniture' == doc.type ) {
//      emit( doc._id, {_id: doc.symbolId} );
//    }
//  }
//}
