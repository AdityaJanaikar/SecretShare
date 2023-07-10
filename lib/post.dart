import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class Post extends StatelessWidget {
  final String text;
  final String bartext;

  const Post({
    required this.text,
    required this.bartext,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: Column(
        children: <Widget>[
          Container(
            padding: EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: Colors.black,
              border: Border.all(color: Colors.white),
              borderRadius: BorderRadius.all(Radius.circular(8.0)),
            ),
            child: Text(
              text,
              textAlign: TextAlign.left,
              overflow: TextOverflow.ellipsis,
              style: TextStyle(
                color: CupertinoColors.white,
              ),
            ),
          ),
          Container(
            padding: EdgeInsets.symmetric(vertical: 8.0),
            decoration: BoxDecoration(
              color: Colors.black26,
              border: Border.all(color: Colors.white),
              borderRadius: BorderRadius.all(Radius.circular(8.0)),
            ),
            child: Text(
              bartext,
              style: TextStyle(
                color: Colors.blue[150],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

