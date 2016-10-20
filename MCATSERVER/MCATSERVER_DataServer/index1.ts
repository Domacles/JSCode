import * as Redis from 'ioredis';
import * as net from 'net';

let redis = new Redis(11111, 'localhost');