export default {
    fileSystem: {
        path: './db'
    },
    mongodb: {
        cnxStr: 'mongodb+srv://admin:admin@cluster0.bev71ps.mongodb.net/test',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    },
    firebase: {
        "type": "service_account",
        "project_id": "coder32195c20-b419b",
        "private_key_id": "f24d5ae76314daff1594b55eb36f2081b3cf7ed7",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDe2fxVu0n+cUJF\nlhs0545jEnxUbBgiSVODHUMx1RdLVisBwFnK2uZdGBbJQ8NUt2br3Z09/82+BQPl\n7QNISb7GFmTjik162nxSZ+4gebSpycqn37BCIkbu3DduZbwRM8DquI6DXcz7eqLc\nUQ1KLyayOHuQZoIcW0Z5SbbSSHjz9YLGEOS3Mk24ed0eSTauhNDLahc99EQmZs2/\nMTSd3wh4CxnLgojYqZOQBIX2AzO2sVsSSj8iYZbZkO+UmaUuGD2IrTNTKDKaiM9R\naVfJ6ZCnuqdXS/hTqqWvjeQaWlk/LFHuumW8UDNNqcKjZbZIhEgkdm49le+iH7nY\ndhqwfdsRAgMBAAECggEACNoz5zFCETTCjdfBS5VfLJmmuAZ14aF0CyNLG1xRnpEq\nXYQcjQMBCkr+Ag9ftP/MENaEJoWrez7hFsMW0Z+hpRDCqonrO1QZLX9/ZWmFlFu1\ntybFmPrvl7wbtOue+uKevomHmmRMKOPdkE7lQ5XNPbXMrWxvrVywLKU8Tpdzu+Jp\nHBG61eLqZJewwKQufiStkIKVo5QRE7RmRX9qsG+pSQKpRvLef5lT1u1622V8bAS8\n9iJvTbbMOhNjA2Z2PCe0kUnCGvd4UsbF8xRS4EuWNVHoCHVl/49gmZzZMm7O6Eut\nJmuAy9nDk3Q7arPCDxrYXrlRWTy+GizO0RvsIWj8eQKBgQD8gHNCvQd9yFlrOyMR\n1jGVySOXLzZyP7deAgnmC5Cfcy0pezjCt/m+pdMxrTnuNJjBo4+wWTrZDOzQrHyc\nBCQp1Qvdypb5tW1llXSX+9ECVwyX9BkTFj0AC7p7eGIyuGgeNAuMZwN1Qzb5jA9Z\nGXQk57Z2gldYMu/dYMskP7tCOwKBgQDh8F/rkeP7tn5z0kZJVAwQegiIwrltwKXu\n3S0Ou8T28wpsc4sfgFoB3J+uzEKBFShNXb5IwZoxa+q/5x26LDAv7LLEMBtrrWgs\npkud2eqNC8Ss4pD9iGvcerXUFfBqAdM0HPRJClAkYvgbu3Eq4eENxui8rPGxTf2+\nYo0kuUmXIwKBgAwVGW7YHMOoEp9O9R6lYToJpepWGATfh6a38kFPzFvU5xRVESJA\nK3Mz/CckYuFDIwwhB38oxegc9jgGCPBuQky+JRM33oGUbOevfyTGp/m0sKWUyJ5h\nMgoOhZ3i5NAIgvLvCp5tT30M+lR2n0VkMmqRq+l/0y4lQdUWDKJvakaBAoGALie4\nsJrhA+7H7kkqaphszoDfdXCyCKWuQBmWtsfM+NW1b2o7JXhG6tJzHHZFr7Duxr87\nvAkwwp/VGNbRz9JvFZs4+bMKJvkJqvVdxSVbMO0ShG7UR7ayshuvQWAp+L3es2qm\nzLT6ojRFkwS7nZL/Mp1Lth9uUFYqW9YuFy5yxhkCgYEAwEdFjV39rd7L4BkXfhWP\nLJE7wNkLP1TKFWHL07uw/9XtJVv4nXwk7WqA87CUW33EunAO8yqGtfcgBaH0FiFY\nRI0m5eSPpo3v2MJi30Vg8IDgGRE6Hzqxn9qE+ksWNKFBimXaNQo+rsx42Pf4bWwF\nD06T/u5baXAV9K/oWWyEtfY=\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-dsbn5@coder32195c20-b419b.iam.gserviceaccount.com",
        "client_id": "113261723416802092632",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-dsbn5%40coder32195c20-b419b.iam.gserviceaccount.com"
      },
    sqlite3: {
        client: 'sqlite3',
        connection: {
            filename: `./db/ecommerce.sqlite`
        },
        useNullAsDefault: true
    },
}