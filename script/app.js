(function () {
  "use strict";
  window.onload = function () {
    console.log("ready!");
    let notifications = [].concat(window.notifications);

    const handlerMarkAllAsRead = () => {
      notifications = notifications.map((e) => ({ ...e, isNew: false }));
    };

    const renderList = () => {
      const listRenderId = document.getElementById("top-list-binding");
      for (let i in notifications) {
        listRenderId.innerHTML += `
                <div class="top-list-notification" data-id="${
                  notifications[i]?.id
                }">
                    <div class="top-notification-avatar-area">
                        <img
                        class="top-notification-avatar"
                        src="${notifications[i]?.avatarSrc}"
                        alt="avatar"
                        />
                    </div>
                    <div class="top-notification-content-area">
                        <div class="top-notification-title">
                        ${notifications[i]?.title}

                        ${
                          notifications[i]?.isNew
                            ? '<span class="top-badge-dot"></span>'
                            : ""
                        }
                        
                        </div>
                        <div class="top-notification-extra">
                        ${notifications[i]?.time}</div>

                        ${
                          notifications[i]?.description?.length > 0
                            ? ` <div class="top-notification-description">
                            ${notifications[i]?.description}
                            </div>`
                            : ""
                        }
                    </div>
                    ${
                      notifications[i]?.pictureSrc
                        ? `
                        <div class="top-notification-picture-area">
                                <img src="${notifications[i].pictureSrc}" alt="picture" />
                        </div>`
                        : ""
                    }
                   
                </div>
        `;
      }
    };

    const removeList = () => {
      const listRenderId = document.getElementById("top-list-binding");
      listRenderId.innerHTML = "";
    };

    const getTotalUnread = () => {
      document.getElementById("total-unread").innerText =
        notifications?.filter((e) => e.isNew)?.length || 0;
    };

    const refreshList = () => {
      removeList();
      renderList();
      getTotalUnread();
    };

    const addNewNotification = () => {
      const newItem = {
        id: +notifications?.[0].id + 1 || 1,
        avatarSrc: "../../assets/images/avatar-angela-gray.webp",
        title: "<a>New notification</a>  has been created",
        isNew: true,
        description: "",
        time: "Now",
      };
      notifications.unshift(newItem);
    };

    document.getElementById("button-mark-all-as-read").onclick = () => {
      handlerMarkAllAsRead();
      refreshList();
    };

    document.getElementById("button-add-new").onclick = () => {
      addNewNotification();
      refreshList();
    };

    // document.getElementById("button-100-add-new").onclick = () => {
    //   for (let i = 0; i < 100; i++) {
    //     addNewNotification();
    //   }
    //   refreshList();
    // };

    document.getElementById("top-list-binding").onclick = (event) => {
      const elementNotification = event?.path?.[2];
      if (elementNotification) {
        const dataId = elementNotification.dataset?.id;
        notifications = notifications.map((e) =>
          e?.id === +dataId ? { ...e, isNew: false } : { ...e }
        );
        refreshList();
      }
    };

    const initial = () => {
      renderList();
    };

    initial();
  };
})();
