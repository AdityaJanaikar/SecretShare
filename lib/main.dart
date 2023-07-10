import 'package:flutter/material.dart';
import 'package:conftwitter/post.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Confessions Page',
      theme: ThemeData(
        brightness: Brightness.dark,
        primarySwatch: Colors.blue,
      ),
      home: ConfessionsPage(),
    );
  }
}

class ConfessionsPage extends StatelessWidget {
  final List<String> confessions = [
    'This is a post',
    'This is another post',
    'A third post',
    'Yet another post',
    'One more post',
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Confessions Page'),
      ),
      body: Container(
        color: Colors.black,
        child:Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
        children:[
          Expanded(
            child:ListView.builder(
              itemCount: confessions.length,
              itemBuilder: (BuildContext context, int index) {
                return Container(
                  width: double.infinity,
                  child: Post(
                    text: confessions[index],
                    bartext: '19 M ENI', // Replace with appropriate details for each post
                  ),
                );
                },
              ),
            )
          ],

        )
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          // Add functionality for the floating action button here
          // e.g., navigate to a form for submitting new confessions
        },
        child: Icon(Icons.add),
      ),
    );
  }
}





/*
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import './post.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build (BuildContext context){
    return MaterialApp(
      home: Mainpage(),
    );
  }
}
class Mainpage extends StatelessWidget{
  @override
  Widget build (BuildContext context) {
    return Scaffold(
      appBar: AppBar(

        title: Text('BPGC Confessions',
          style: TextStyle(color: Colors.green[100]),
        ),
        backgroundColor: Colors.black54,

      ),
      //backgroundColor: Colors.black26,
      body: Column(
        children: [
          SizedBox(
          height: 40,
          width: Checkbox.width,
          //width: BorderSide.strokeAlignOutside,
          child: Column(
              children:<Widget>
              [
                Container(

                    height: 35,
                    padding: EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: Colors.brown,
                      border: Border.all(color: Colors.white),
                      borderRadius: BorderRadius.all(CupertinoScrollbar.defaultRadius),
                    ),
                    child:Text(
                      'This is a post',
                      textAlign: TextAlign.left,
                      overflow: TextOverflow.ellipsis,
                      style: TextStyle(
                        color: CupertinoColors.white,
                      ),
                    )

                ),
                Container(
                  padding: EdgeInsets.all(16),
                  height: 5,
                  decoration: BoxDecoration(
                    color: Colors.black26,
                    border: Border.all(color: Colors.white),
                    borderRadius: BorderRadius.all(CupertinoScrollbar.defaultRadius),
                  ),
                  child: Text(
                    '19 M ENI',
                    style: TextStyle(
                      color: Colors.blue[150],
                    ),
                  ),
                )
              ]
          )


      ),
          // Post(
          //   text: "This is another post",
          //   bartext: "19 F ECE",
          // ),
        ]
      )
    );
  }
}
*/

