/* =========================================================
   PTIS DIGITAL FORM ASSISTANT
   EDCAFE CHATBOT CONTROLLER
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const assistantButton =
        document.getElementById("ptisAssistantButton");

    const assistantPanel =
        document.getElementById("ptisAssistantPanel");

    const assistantClose =
        document.getElementById("ptisAssistantClose");


    /* =====================================================
       SAFETY CHECK
    ===================================================== */

    if (!assistantButton || !assistantPanel) {

        console.warn(
            "PTIS Assistant: required elements not found."
        );

        return;

    }


    /* =====================================================
       OPEN ASSISTANT
    ===================================================== */

    function openAssistant() {

        assistantPanel.classList.add("active");

        assistantPanel.setAttribute(
            "aria-hidden",
            "false"
        );

        assistantButton.setAttribute(
            "aria-expanded",
            "true"
        );

        document.body.classList.add(
            "ptis-assistant-open"
        );

    }


    /* =====================================================
       CLOSE ASSISTANT
    ===================================================== */

    function closeAssistant() {

        assistantPanel.classList.remove("active");

        assistantPanel.setAttribute(
            "aria-hidden",
            "true"
        );

        assistantButton.setAttribute(
            "aria-expanded",
            "false"
        );

        document.body.classList.remove(
            "ptis-assistant-open"
        );

    }


    /* =====================================================
       TOGGLE ASSISTANT
    ===================================================== */

    function toggleAssistant() {

        const isOpen =
            assistantPanel.classList.contains(
                "active"
            );

        if (isOpen) {

            closeAssistant();

        } else {

            openAssistant();

        }

    }


    /* =====================================================
       FLOATING BUTTON CLICK
    ===================================================== */

    assistantButton.addEventListener(
        "click",
        (event) => {

            event.stopPropagation();

            toggleAssistant();

        }
    );


    /* =====================================================
       CLOSE BUTTON
    ===================================================== */

    if (assistantClose) {

        assistantClose.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();

                closeAssistant();

            }
        );

    }


    /* =====================================================
       ESC KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Escape") {

                closeAssistant();

            }

        }
    );


    /* =====================================================
       CLICK OUTSIDE PANEL
       Desktop only
    ===================================================== */

    document.addEventListener(
        "click",
        (event) => {

            const isOpen =
                assistantPanel.classList.contains(
                    "active"
                );

            if (!isOpen) {
                return;
            }


            const clickedInsidePanel =
                assistantPanel.contains(
                    event.target
                );


            const clickedButton =
                assistantButton.contains(
                    event.target
                );


            if (
                !clickedInsidePanel &&
                !clickedButton
            ) {

                closeAssistant();

            }

        }
    );


    /* =====================================================
       PREVENT PANEL CLICK FROM CLOSING
    ===================================================== */

    assistantPanel.addEventListener(
        "click",
        (event) => {

            event.stopPropagation();

        }
    );


    /* =====================================================
       INITIAL STATE
    ===================================================== */

    assistantPanel.classList.remove(
        "active"
    );

    assistantPanel.setAttribute(
        "aria-hidden",
        "true"
    );

    assistantButton.setAttribute(
        "aria-expanded",
        "false"
    );


    /* =====================================================
       READY
    ===================================================== */

    console.log(
        "PTIS Digital Form Assistant ready."
    );

});