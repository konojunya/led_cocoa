#include <ESP8266WiFi.h>
#include <Milkcocoa.h>
#include <Adafruit_NeoPixel.h>
extern "C" {
  #include "user_interface.h"
}
/************************* WiFi Access Point *********************************/
#define WLAN_SSID       "makki_wifi"
#define WLAN_PASS       "000000000"
/************************* Your Milkcocoa Setup *********************************/
#define MILKCOCOA_APP_ID      "noteiprs7bq4"
#define MILKCOCOA_LED       "led"
/************* Milkcocoa Setup (you don't need to change this!) ******************/
#define MILKCOCOA_SERVERPORT  1883

#define RED 2
#define GREEN 4
#define BLUE 5

#define PIN     2
#define NUMPIXELS      10
Adafruit_NeoPixel pixels(NUMPIXELS, PIN);
WiFiClient client;
const char MQTT_SERVER[] PROGMEM    = MILKCOCOA_APP_ID ".mlkcca.com";
const char MQTT_CLIENTID[] PROGMEM  = __TIME__ MILKCOCOA_APP_ID;

Milkcocoa milkcocoa = Milkcocoa(&client, MQTT_SERVER, MILKCOCOA_SERVERPORT, MILKCOCOA_APP_ID, MQTT_CLIENTID);
