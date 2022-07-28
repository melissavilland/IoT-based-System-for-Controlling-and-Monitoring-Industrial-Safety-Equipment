import time
from umqttsimple import MQTTClient
import ubinascii
import machine
from machine import Pin, ADC
# import dht
import micropython
import network
# import ujson
import esp
try:
  import usocket as socket
except:
  import socket
esp.osdebug(None)
import gc
gc.collect()


client_id = ubinascii.hexlify(machine.unique_id())
# mqtt_server = '192.168.1.184'
# mqtt_server = '192.168.1.31'
mqtt_server = '192.168.43.56'
topic_sub = b"home/door1"
topic_pub = b'notification'

led_green = machine.Pin(4, machine.Pin.OUT)
led_red = machine.Pin(5, machine.Pin.OUT)
p = machine.Pin(0, machine.Pin.OUT, machine.Pin.PULL_UP)
pwm = machine.PWM(p, freq=50)

led_green.off()
led_red.off()

last_message = 0
message_interval = 9
counter = 0

# SSID = "Coman"
# PASSWORD = 'Inferior18!'

# SSID = "Catedra MURI"
# PASSWORD = "azsxdcfvqawsedm412"

SSID = "sarmale"
PASSWORD = "marceltivercred"

def do_connect():
    import network
    sta_if = network.WLAN(network.STA_IF)
    if not sta_if.isconnected():
        print('\nconnecting to network...')
        sta_if.active(True)
        sta_if.connect(SSID, PASSWORD)
        while not sta_if.isconnected():
            pass
    print('network config:', sta_if.ifconfig())

