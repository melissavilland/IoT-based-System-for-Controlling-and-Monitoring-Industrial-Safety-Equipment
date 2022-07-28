import time

do_connect()

message = None

def sub_cb(topic, msg):
    global message
    print((topic, msg))
    message = msg


def connect_and_subscribe():
    global client_id, mqtt_server, topic_sub
    client = MQTTClient(client_id, mqtt_server)
    print(client.server)
    client.set_callback(sub_cb)
    client.connect()
    client.subscribe(topic_sub)
    print('Connected to %s MQTT broker, subscribed to %s topic' %(mqtt_server, topic_sub))
    return client

def restart_and_reconnect():
    print('Failed to connect to MQTT broker. Reconnecting...')
    time.sleep(2)
    machine.reset()

try:
    client = connect_and_subscribe()
except OSError as e:
    restart_and_reconnect()


def map(x, in_min, in_max, out_min, out_max):
    return int((x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min)


def servo(pin, angle):
    pin.duty(map(angle, 0, 180, 20, 120))
    # pin.duty(45)


angle = 0

servo(pwm, angle)

while True:
    try:
        client.check_msg()
        if message == b'close':
            client.publish(topic_pub, b'received')
            led_green.off()
            led_red.on()  
            angle += 90
            if angle <= 180:
                servo(pwm, angle)
            else:
                angle = 180
                print('not possible')
        if message == b'open':
            client.publish(topic_pub, b'received')
            led_red.off()
            led_green.on()
            angle = 0
            servo(pwm, angle)
        message = None
        time.sleep(2)

        # if (time.time() - last_message) > message_interval:
        #     msg = 'Hello ' + str(i)
        #     i += 1
        #     print(msg)
        #     # client.publish(topic_pub, msg)
        #     last_message = time.time()
    except OSError as e:
        restart_and_reconnect()