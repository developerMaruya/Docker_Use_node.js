const publicVapidKey = "BC2fDFNkRaVbdnplbDy5Q-oPh70eOFg7VWyL_yHrf9GT8B603d0MTd0hpxobxFu8gfzEACIBI-yUmrzENZy9Yac";

if ('serviceWorker' in navigator) {
  registerServiceWorker().catch(console.log);
}

async function registerServiceWorker() {
  const register = await navigator.serviceWorker.register('./worker.js', {
    scope: '/'
  });

  const existingSubscription = await register.pushManager.getSubscription();

  if (existingSubscription) {
    await existingSubscription.unsubscribe();
  }

  const newSubscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
  });

  await fetch("/subscribe", {
    method: "POST",
    body: JSON.stringify(newSubscription),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}
