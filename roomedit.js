// formatting utility

function pluralSuffix( n ) {
  return 1 == n ? "" : "s";
}

function dotOrColon( n ) {
  return 0 == n ? "." : ":";
}

// capitalise a word, i.e. upercase first letter

function capitalise(s) {
  return s[0].toUpperCase() + s.slice(1);
}

// replace all spaces by underscores

function unspace(s) {
  return s.replace(/ /g,'_');
}

// return the proper keys of the given dictionary d:

function jt_get_keys(d) {
  var keys = [];
  for (var key in d) {
    if (d.hasOwnProperty(key)) {
      keys.push(key);
    }
  }
  return keys;
}

// split url parameters into a dictionary

function get_url_paramdict( params ) {
  paramdict = {};
  var a = params.split("&");
  for(var i = 0; i < a.length; ++i)
  {
    var kv = a[i].split("=");
    paramdict[kv[0]] = kv[1];
  }
  return paramdict;
}

// rotation support

function rotate_item (item, angle) {
  if( null != item ) {
    item.rotate( angle );
    item.data( "angle",
      item.data( "angle" ) + angle );
  }
}

function rotate_current_cw () {
  rotate_item( current_furniture, 5 );
}

function rotate_current_ccw () {
  rotate_item( current_furniture, -5 );
}

// edit element properties

function edit_properties_current(url) {
  if( null != current_furniture ) {
    var id = current_furniture.data("jid");
    window.location.href = url + '?furnitureid=' + id;
  }
}

// save modified element properties

function save_properties(fdoc,do_save) {
  var modified_count = 0;
  var url_room = url + '?roomid=' + fdoc.roomId;

  if(do_save) {
    var a = fdoc.properties;
    var keys = jt_get_keys( a );
    var n = keys.length;
    for( var i=0; i<n; ++i ) {
      var key = keys[i];
      var val = a[key];
      var key_id = unspace(key);
      if( 'w' == val[0] ) {
        var w = $('#' + key_id);
        var val2 = w.val(); // equals w.attr('value');
        if( val2 != val.slice(2) ) {
          ++modified_count;
          fdoc.properties[key] = 'w ' + val2;
        }
      }
    }
    if( 0 < modified_count ) {
      if( fdoc.hasOwnProperty('loop') ) {
        delete fdoc.loop;
      }
      db.saveDoc( fdoc,
        function (err, data) {
          if (err) {
            console.log(err);
            alert(JSON.stringify(err));
          }
          window.location.href = url_room;
        }
      );
    }
  }
  // bad boy!
  // cannot execute anything important here,
  // because that will destroy the effrts of
  // the async callback function in save_doc.
  //var rid = fdoc.roomId;
  //window.location.href = url + '?roomid=' + rid;
  if( 0 == modified_count ) {
    window.location.href = url_room;
  }
}

// save new furniture positions

function save(a) {

  $('#save').attr("disabled", "disabled");

  for( var i = 0; i < a.length; ++i ) {

    var f = a[i];
    var id = f.data("jid");
    var txy = f.transform().toString().substring(1).split(/[,r]/);
    var trxy = 'R' + f.data('angle')
      + 'T' + txy[0] + "," + txy[1];

    var fdoc = f.data("doc");

    fdoc.transform = trxy;

    if( fdoc.hasOwnProperty('loop') ) {
      delete fdoc.loop;
    }
    db.saveDoc( fdoc,
      function (err, data) {
        if (err) {
          console.log(err);
          alert(JSON.stringify(err));
        }
      }
    );
  }
}

function save_all() {
  save( all_furniture );
}

function refresh() {
  document.location.reload( true );
  $('#save').removeAttr("disabled");
}

// data extraction support

function get_floats_from_string( s, sep ) {
  var a = s.split(sep);
  var i, n = a.length;
  for( i = 0; i < n; ++i ) {
    a[i] = parseFloat( a[i] );
  }
  return a;
}

// add to modified furniture item list

function add_to_modified_furniture(item) {
  var jid = item.data("jid");
  var found = null;
  for( var i = 0; i < all_furniture.length; ++i ) {
    if( all_furniture[i].data("jid") == jid ) {
      found = all_furniture[i];
      break;
    }
  }
  if( !found ) {
    all_furniture.push( item );
  }
}

// identification support

function identify (item) {
  if( null != current_furniture ) {
    current_furniture.animate({"fill-opacity": 1.0}, 500);
  }
  current_furniture = item;
  item.animate({"fill-opacity": .5}, 500);
  var doc = item.data("doc");
  var s = doc.name + " " + doc.description;
  $('#current_furniture').text( s );
  add_to_modified_furniture( item );
}

function jonclick2 () {
  identify( this );
}

// drag support

function dragger () {
  identify( this );
  var txy = this.transform().toString().substring(1).split(",");
  console.log("dragger: "+txy);
  this.ox = parseFloat(txy[0]);
  this.oy = parseFloat(txy[1]);
  this.animate({"fill-opacity": .5}, 500);
  this.rotate( -this.data("angle") );
}

function move (dx, dy) {
  dx = Math.round(xscale * dx);
  dy = Math.round(yscale * dy);
  var txy = "T" + (this.ox + dx).toString()
    + "," + (this.oy + dy).toString();
  this.transform("");
  this.transform(txy);
  paper.safari();
}

function up () {
  this.animate({"fill-opacity": 1}, 500);
  this.rotate( this.data("angle") );
}

// tooltip support

function tooltip_show(e) {

  var offset = $('#editor').offset();
  var x = e.pageX - offset.left;
  var y = e.pageY - offset.top;
  //var y2 = y - offset.top;
  var id = e.currentTarget.raphaelid;
  var item = paper.getById(id);

  var x3 = x * xscale;
  var y3 = y * yscale;
  var x4 = x3 + xmin;
  var y4 = y3 + ymin - 12 * yscale;

  var doc = item.data("doc");
  var s = doc.name + " " + doc.description;
  tooltip
    .attr("text", s)
    .attr("x", x4 )
    .attr("y", y4 );

  //var w = tooltip.attr("width");
  var bb = tooltip.getBBox();
  var w = bb.width;
  var w2 = w * 0.5;
  var h2 = bb.height * 0.5;

  tooltip_bg
    .attr("width", w + 8 )
    .attr("x", x4 - w2 - xscale )
    .attr("y", y4 - h2 - yscale )
    .attr("fill", "lightyellow")
    .attr("opacity", 0.8)
    .toFront()
    .show();

  tooltip
    .toFront()
    .show();
}

function tooltip_hide(e) {
  tooltip.hide();
  tooltip_bg.hide();
}

function raphael( roomdoc, furniture ) {

  // set up canvas

  // min-x=left min-y=top width height
  var v = get_floats_from_string( roomdoc.viewBox, " " );
  var w = 600;
  var h = Math.round(((v[3] * w) / v[2]) + 0.5);

  paper = Raphael("editor", w, h);
  xmin = v[0];
  ymin = v[1];
  xscale = v[2] / w;
  yscale = v[3] / h;

  paper.setViewBox( xmin, ymin, v[2], v[3], false );

  // tooltip support

  var att = { fill: "white", stroke: "black",
    "stroke-width": 0.1 * xscale, "opacity" : 0.85 };

  tooltip_bg = paper
    .rect( 0, 0, 55 * xscale, 17 * yscale, 2 * xscale )
    .attr(att).hide();

  tooltip = paper
    .text( 0, 0, '' ).attr("font-size", 12 * yscale )
    .hide();

  // room - outer loop anti-clockwise, inner clockwise

  att = { fill: "gray", "fill-opacity": "0.2",
    stroke: "black", "stroke-width": 0.1 * xscale };

  var room = paper
    .path( roomdoc.loops )
    .attr( att )
    .data( "doc", roomdoc );

  $(room.node)
    //.hover( tooltip_show, tooltip_hide )
    .mousemove( tooltip_show )
    .mouseout( tooltip_hide );

  // furniture

  att = { fill: "green", stroke: "black",
    "stroke-width": 0.1 * xscale, class: "pointer" };

  for( var i=0; i < furniture.length; ++i ) {
    var f = furniture[i];
    console.log(f.transform);
    var trxy = f.transform.slice(1).split(/[,RT]/)
    var angle = parseFloat(trxy[0]);
    console.log(trxy[0]+","+trxy[1]+","+trxy[2]);

    var item = paper.path( f.loop )
      .transform("T"+trxy[1]+","+trxy[2])
      .rotate( angle )
      .click(jonclick2)
      .data("angle", angle )
      .data("jid", f._id)
      .data("doc", f)
      .attr(att)
      .drag(move, dragger, up);

    $(item.node)
      //.hover( tooltip_show, tooltip_hide )
      .mousemove( tooltip_show )
      .mouseout( tooltip_hide );
  }
};
