# roomedit

Roomedit implements a simplified 2D cloud-based round-trip room editor.

It displays and edits 2D plan view the furniture and equipment layout in a room coming from a building information model
or [BIM](https://en.wikipedia.org/wiki/Building_information_modeling).

It cooperates with the [RoomEditorApp](https://github.com/jeremytammik/RoomEditorApp) Revit add-in that exports information from Revit and re-imports the modified data.

The model, level, room, furniture and symbol data is stored in a
cloud-based [CouchDB](https://couchdb.apache.org) data
repository and includes the hierarchical relationships and geometry definitions encoded in SVG,
[scalable vector graphics](https://en.wikipedia.org/wiki/Scalable_Vector_Graphics).

This data is queried and displayed on a browser on any device, including tablets and smartphones, using server-side scripting in JavaScript.

It generates HTML and SVG code to:

- Navigate the model.
- Display the room and furniture graphically using SVG.
- Edit the furniture position and rotation interactively.
- Update the data repository with new placement data.

For an intermediate snapshot of the development process in mid-2013, please refer to
the [project description and status](http://thebuildingcoder.typepad.com/blog/2013/05/my-cloud-based-2d-editor-implementation-status.html#2),
including a [two-minute video recording](https://www.youtube.com/watch?v=-FjXWokH1Ss).

The complete project presentation including a video recording and all materials is provided by the Autodesk University 2013 online class
[DV1736 &ndash; *Cloud-Based, Real-Time, Round-Trip, 2D Revit Model Editing on Any Mobile Device*](http://au.autodesk.com/au-online/classes-on-demand/class-catalog/2013/building-design-suite/dv1736).

The detailed analysis, implementation and development process is discussed by [The Building Coder](http://thebuildingcoder.typepad.com) in the following categories:

- [Cloud](http://thebuildingcoder.typepad.com/blog/cloud)
- [Desktop](http://thebuildingcoder.typepad.com/blog/desktop)
- [Mobile](http://thebuildingcoder.typepad.com/blog/mobile)


## Update

November 2015 &ndash; Here is a
recent [summary and overview description](http://thebuildingcoder.typepad.com/blog/2015/11/connecting-desktop-and-cloud-room-editor-update.html#3) of
this project.


## Installation

One way to run the roomedit CouchDB app is to host it on a public CouchDB hosting platform such
as [Iris Couch](http://www.iriscouch.com).

In that case, you only have to fork and clone this repository and launch your version of the app on that host.

Another way is to install and
run both [Apache CouchDB](http://couchdb.apache.org) and
the roomedit app itself locally on your own system.

That's all you need.

That's not yet all, though...

While developing this, I used Kanso on the Mac Unix command line to install the database definition in CouchDB from my hand-edited local system files.

I then replicated the local Unix-hosted database to a cloud-hosted IrisCouch one, and replicated that from the cloud to the Windows system running Revit.

I was unable to get Kanso running directly on Windows, and also failed with other similar CouchDB installation tools.

The simplest way for you to install the database definition files presented here on a Windows system is probably to grab this zip file of my own database definition `roomedit.couch` copied directly from my Windows CouchDB repository in `C:\Program Files (x86)\Apache Software Foundation\CouchDB\var\lib\couchdb` and unpack it in the corresponding location on your own system:

- [windows_couchdb/roomedit.couch.zip](windows_couchdb/roomedit.couch.zip)



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
