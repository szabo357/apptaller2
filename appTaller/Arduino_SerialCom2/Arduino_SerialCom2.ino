int data   = 0;
int estado = 0;
int pos    = 0;

int sensor1 = 0;
int sensor2 = 0;

int SalidasDigitales[] ={ 8,9,10,11,12};
int EstadoEntradasAnalogicas[] = {0,0,0,0,0,0};

void setup() {
   // Inicializa la comunicacion serial.
  Serial.begin(57600);    
  delay(1000);
  for(int i =0; i < 5; i++){
    pinMode(SalidasDigitales[i],OUTPUT);
  }
}

void loop() {
 
  while (Serial.available()){
  
    data = Serial.parseInt();
   
   switch(data){
   case 1:  digitalWrite( SalidasDigitales[0], HIGH);
            Serial.println("dig/Salida 1-ON");
            break;
   case 2:  digitalWrite( SalidasDigitales[0], LOW);
            Serial.println("dig/Salida 1-OFF"); 
            break;
   case 3:  digitalWrite( SalidasDigitales[1], HIGH);
            Serial.println("dig/Salida 2-ON");
            break;
   case 4:  digitalWrite( SalidasDigitales[1], LOW);
            Serial.println("dig/Salida 2-OFF");
            break;
   case 5:  digitalWrite( SalidasDigitales[2], HIGH);
            Serial.println("dig/Salida 3-ON");
            break;
   case 6:  digitalWrite( SalidasDigitales[2], LOW); 
            Serial.println("dig/Salida 3-OFF");
            break;
   case 7:  digitalWrite( SalidasDigitales[3], HIGH);
            Serial.println("dig/Salida 4-OFF");
            break;
   case 8:  digitalWrite( SalidasDigitales[3], LOW);
            Serial.println("dig/Salida 4-OFF");
            break;
   case 9:  digitalWrite( SalidasDigitales[4], HIGH);
            Serial.println("dig/Salida 5-ON");
            break;
   case 10: digitalWrite( SalidasDigitales[4], LOW);
            Serial.println("dig/Salida 5-OFF");
            break;
   case 11: //Entrada-Analogica0             
            EstadoEntradasAnalogicas[0] = 1 - EstadoEntradasAnalogicas[0];
            break;
   case 12: //Entrada-Analogica1 
            EstadoEntradasAnalogicas[1] = 1 - EstadoEntradasAnalogicas[1];
            break;         
   default:
            for(int i= 0;i < 5; i++){
              digitalWrite(SalidasDigitales[i],LOW);
            } 
           break;
   }  
  }
  if( EstadoEntradasAnalogicas[0] == 1 ){
    lecturaAnalogica(0);
  }
  
  if ( EstadoEntradasAnalogicas[1] == 1 ){
    lecturaAnalogica(1);
  }
}

void lecturaAnalogica(int pinAnalogico ){
  int valorLeido = analogRead(pinAnalogico);
  Serial.print("An/Entrada Analogica ");
  Serial.print(pinAnalogico);
  Serial.print(":");                 // Caracter Delimitador
  Serial.println(valorLeido);
  delay(100);
}

