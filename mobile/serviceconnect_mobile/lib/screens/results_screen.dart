import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;

class ResultsScreen extends StatefulWidget {
  @override
  _ResultsScreenState createState() => _ResultsScreenState();
}

class _ResultsScreenState extends State<ResultsScreen> {
  List data = [];
  bool loading = true;

  @override
  void initState() {
    super.initState();
    fetchData();
  }

  void fetchData() async {
    final res = await http.get(
      Uri.parse("http://192.168.X.X:3000/services/recommendations/1"),
    );

    setState(() {
      data = json.decode(res.body);
      loading = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    if (loading) return Center(child: CircularProgressIndicator());

    if (data.isEmpty) return Center(child: Text("Aucun service"));

    return ListView.builder(
      itemCount: data.length,
      itemBuilder: (context, index) {
        final item = data[index];
        return Card(
          child: ListTile(
            title: Text(item['name']),
            subtitle: Text("${item['price']} FCFA"),
            trailing: Text("${item['match']}%"),
          ),
        );
      },
    );
  }
}