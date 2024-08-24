import { globals } from './globals'
function unLockApp(mvStatus, callback) {
    if (localStorage.getItem('loanAppNo') &&
        mvStatus && (mvStatus === globals.state.PENDING || mvStatus === globals.state.RE_SUBMITTED)) {
        try {
            var settings = {
                "mode": "no-cors",
                "url": globals.api.HOST + "unlockApp?loanAppNo=" + localStorage.getItem('loanAppNo'),
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
    typeof callback === "function" && callback();

}

function GetFormattedDate(date, tenure) {
    console.log(date);
    var todayTime = new Date(date);
    var month = todayTime.getMonth() + tenure;
    var day = todayTime.getDate();
    var year = todayTime.getFullYear();
    console.log(day + "/" + month + "/" + year);
    return day + "/" + month + "/" + year;
}

function clearLocalStorage() {
    if (localStorage.getItem('rememberMe')) {
        const agentName = localStorage.getItem('agentName');
        const password = localStorage.getItem('password');
        localStorage.clear();
        localStorage.setItem('rememberMe', true);
        localStorage.setItem('agentName', agentName);
        localStorage.setItem('password', password);
    } else {
        localStorage.clear();
    }

}



export { unLockApp, clearLocalStorage, GetFormattedDate };