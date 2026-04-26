import 'package:flutter/material.dart';

class ContactScreen extends StatefulWidget {
  @override
  _ContactScreenState createState() => _ContactScreenState();
}

class _ContactScreenState extends State<ContactScreen> {
  String selected = "";

  void sendPreferences() async {
    // appel API ici
    print(selected);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Méthode de contact")),
      body: Column(
        children: [
          buildOption("whatsapp"),
          buildOption("call"),
          buildOption("chat"),
          ElevatedButton(
            onPressed: sendPreferences,
            child: Text("Continuer"),
          )
        ],
      ),
    );
  }

  Widget buildOption(String value) {
    return GestureDetector(
      onTap: () => setState(() => selected = value),
      child: Container(
        margin: EdgeInsets.all(10),
        padding: EdgeInsets.all(15),
        color: selected == value ? Colors.orange : Colors.grey[200],
        child: Text(value),
      ),
    );
  }
}