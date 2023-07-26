import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class ConForm extends StatefulWidget {
  @override
  FormState createState() => FormState();
}

class FormState extends State<ConForm> {
  final TextEditingController con = TextEditingController();
  final TextEditingController batch = TextEditingController();
  final TextEditingController gen = TextEditingController();
  final TextEditingController branch = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: Text('Add Confession'),
      content: SingleChildScrollView(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(
              controller: con,
              decoration: InputDecoration(hintText: 'Enter your post...'),
              maxLines: 4,
            ),
            SizedBox(height: 16),
            TextField(
              controller: batch,
              decoration: InputDecoration(hintText: 'Batch '),
            ),
            SizedBox(height: 16),
            TextField(
              controller: gen,
              decoration: InputDecoration(hintText: 'Gender '),
            ),
            SizedBox(height: 16),
            TextField(
              controller: branch,
              decoration: InputDecoration(hintText: 'Branch '),
            ),
          ],
        ),
      ),
      actions: [
        Expanded(
          child: ElevatedButton(
    onPressed: () async {
      String confessionText = con.text;
      String batchText = batch.text.isNotEmpty ? batch.text : 'ANON';
      String genderText = gen.text.isNotEmpty ? gen.text : 'ANON';
      String branchText = branch.text.isNotEmpty ? branch.text : 'ANON';

      // Create a map to represent the data
      Map<String, String> data = {
        'confession': confessionText,
        'batch': batchText,
        'gender': genderText,
        'branch': branchText,
      };

      // Send the data to the Node.js endpoint
      try {
        Uri url = Uri.parse('http://10.0.2.2:3000/data');
        http.Response response = await http.post(
            url,
            body: data,
          headers: {'Access-Control-Allow-Origin': '*'},
        );
        if (response.statusCode == 200) {
          // Data sent successfully
          print('Data sent successfully');
        } else {
          // Error in sending data
          print('Error in sending data');
        }
      } catch (e) {
        print('Error: $e');
      }

      Navigator.pop(context); // Close the dialog.
    },
            child: Text('Submit'),
          ),
        ),
        Expanded(
          child: TextButton(
            onPressed: () {
              Navigator.pop(context); // Close the dialog.
            },
            child: Text('Cancel'),
          ),
        ),
      ],
    );
  }
}
