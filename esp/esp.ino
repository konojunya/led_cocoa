#include "define.h"
void setup() {
    Serial.begin(115200);
    setupWiFi();
    pinMode(RED, OUTPUT);
    pinMode(GREEN, OUTPUT);
    pinMode(BLUE, OUTPUT);
    milkcocoa.on(MILKCOCOA_LED, "push", onled);
}

void loop() {
    milkcocoa.loop();
}

void onled(DataElement *elem){
    Serial.println("onled!!");
    int red = elem->getInt("red");
    int blue = elem->getInt("blue");
    int green = elem->getInt("green");
    analogWrite(RED, red);
    analogWrite(GREEN, blue);
    analogWrite(BLUE, green);
}
