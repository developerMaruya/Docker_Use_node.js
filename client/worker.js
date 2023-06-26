self.addEventListener('push', function (e) {
    const data = e.data.json();
  
    const options = {
      body: "software developer in iph technologies",
      data: {
        url: "https://in.linkedin.com/company/iph-technologies" 
      }
    };
  
    self.registration.showNotification("Abhishek", options);
  });
  
  self.addEventListener('notificationclick', function (e) {
    const notification = e.notification;
    const url = notification.data.url;
  
    e.waitUntil(
      clients.openWindow(url)
    );
  
    notification.close();
  });
  