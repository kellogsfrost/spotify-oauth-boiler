import { IUser } from "./App";

function openNewAuthWindow(myUrl: string): Promise<IUser>{
    // Open the new window
    const authWindow: Window = window.open(myUrl, '_blank') as Window;

    // Listen for messages from authWindow
    const authPromise: Promise<IUser> = new Promise((resolve, reject) => {
        window.addEventListener('message', (msg) => {
            if (!msg.origin.includes(`${window.location.protocol}//${window.location.host}`)){
                authWindow.close();
                reject('Not Allowed')
            }
            if (msg.data.payload) {
                try {
                    resolve(JSON.parse(msg.data.payload))
                }
                catch(e) {
                    resolve(msg.data.payload)
                }
                finally {
                    authWindow.close()
                }
            } else {
                authWindow.close();
                reject('Unauthorized')
            }
        }, false)
    })
    return authPromise
} 

export default openNewAuthWindow;