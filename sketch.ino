String input;

void setup() {
  Serial.begin(9600);
  delay(2000);
  pinMode(LED_BUILTIN, OUTPUT);
  Serial.println("What to do?");
}
void loop() {
  //digitalWrite(LED_BUILTIN, HIGH);
  //delay(1000);
  //digitalWrite(LED_BUILTIN, LOW);
  //delay(1000);
  if (Serial.available()) {
    //input=Serial.read();
    input = Serial.readStringUntil('\n');

    if (input == "led on") {
      digitalWrite(LED_BUILTIN, HIGH);
    } else if (input == "led off") {
      digitalWrite(LED_BUILTIN, LOW);
    } else {
      Serial.print("Your input: ");
      Serial.println(input);
    }
  }
}
