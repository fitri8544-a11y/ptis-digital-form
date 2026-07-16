function initNavigation(){

    document.querySelectorAll(".menu-item").forEach(button=>{

        button.onclick=()=>{

            document.querySelectorAll(".menu-item").forEach(item=>{

                item.classList.remove("active");

            });

            button.classList.add("active");

            const page=

            button.dataset.page;

            loadPage(page);

        };

    });

}