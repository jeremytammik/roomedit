# roomedit

Roomedit implements a simplified 2D cloud-based room editor.

It displays and edits 2D plan view the furniture and equipment layout in a room coming from a building information model
or [BIM](https://en.wikipedia.org/wiki/Building_information_modeling).

It cooperates with the [RoomEditorApp](https://github.com/jeremytammik/RoomEditorApp) Revit add-in that exports information from Revit and re-imports the modified data.

The model, level, room, furniture and symbol data is stored in a
cloud-based [CouchDB](https://couchdb.apache.org) data
repository and includes the hierarchical relationships and geometry definitions encoded in SVG,
[scalable vector graphics](https://en.wikipedia.org/wiki/Scalable_Vector_Graphics).

This data is queried and displayed on a browser on any device, including tablets and smartphones, using server-side scripting in JavaScript.

It generates HTML and SVG code to:

- Navigate the model
- Display the room and furniture graphically using SVG
- Edit the furniture position and rotation interactively.
- Update the data repository with new placement data.

For further details, please refer to

- http://thebuildingcoder.typepad.com/blog/2013/05/my-cloud-based-2d-editor-implementation-status.html#2

and other posts on The Building Coder, expecially:

- http://thebuildingcoder.typepad.com/blog/cloud
- http://thebuildingcoder.typepad.com/blog/mobile
- http://thebuildingcoder.typepad.com/blog/desktop


## Update

Please also refer to the discussion in [The Building Coder](http://thebuildingcoder.typepad.com)
[cloud](http://thebuildingcoder.typepad.com/blog/cloud) and
[desktop](http://thebuildingcoder.typepad.com/blog/desktop) categories.

Here is a
recent [summary and overview description](http://thebuildingcoder.typepad.com/blog/2015/11/connecting-desktop-and-cloud-room-editor-update.html#3) of
this project.


## Author

Jeremy Tammik,
[The Building Coder](http://thebuildingcoder.typepad.com) and
[The 3D Web Coder](http://the3dwebcoder.typepad.com),
[ADN](http://www.autodesk.com/adn)
[Open](http://www.autodesk.com/adnopen),
[Autodesk Inc.](http://www.autodesk.com)


## License

This sample is licensed under the terms of the [MIT License](http://opensource.org/licenses/MIT).
Please see the [LICENSE](LICENSE) file for full details.
