import { api } from './globals'
function unLockApp() {
    console.log("inside unlockApp");
    try {
        var settings = {
            "mode": "no-cors",
            "url": api.HOST + "unlockApp?loanAppNo=" + localStorage.getItem('loanAppNo'),
            "method": "GET",
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded",
                "token": localStorage.getItem('token')
            }
        }
        fetch(settings.url, {
            method: "GET",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "token": localStorage.getItem('token')
            }

        }).then(res => res.text()
        ).then(res => {
            console.log("unlockApp ", res);
        });

    } catch (e) {
        console.log(e);
    }
}

export { unLockApp };