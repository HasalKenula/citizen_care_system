/* ==========================================================================
   Personal File Management — Behaviour
   Written in plain JavaScript so the page still works (modal, nav toggle)
   even if an external CDN script (jQuery/Bootstrap JS) fails to load.
   DataTables is used only as a progressive enhancement on top of the table.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
    initNavbarToggle();
    initModals();
    initDataTable();
});

/* ----- Mobile navbar toggle ----- */
function initNavbarToggle() {
    var toggler = document.querySelector('.navbar-toggler');
    var collapseTarget = document.getElementById('navbarNav');

    if (!toggler || !collapseTarget) return;

    toggler.addEventListener('click', function () {
        collapseTarget.classList.toggle('show');
    });
}

/* ----- Modal open / close (no Bootstrap JS required) ----- */
function initModals() {
    var openTriggers = document.querySelectorAll('[data-toggle="modal"]');

    openTriggers.forEach(function (trigger) {
        trigger.addEventListener('click', function (event) {
            event.preventDefault();
            var targetSelector = trigger.getAttribute('data-target');
            var modal = document.querySelector(targetSelector);
            if (modal) openModal(modal);
        });
    });

    document.querySelectorAll('.modal').forEach(function (modal) {
        // Close via any [data-dismiss="modal"] element inside this modal
        modal.querySelectorAll('[data-dismiss="modal"]').forEach(function (closeBtn) {
            closeBtn.addEventListener('click', function () {
                closeModal(modal);
            });
        });

        // Close when clicking the dark backdrop (outside modal-content)
        modal.addEventListener('click', function (event) {
            if (event.target === modal) {
                closeModal(modal);
            }
        });
    });

    // Close the top-most open modal on Escape
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            var openModal = document.querySelector('.modal.show');
            if (openModal) closeModal(openModal);
        }
    });
}

function openModal(modal) {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

/* ----- Optional: enhance the records table with DataTables if it loaded ----- */
function initDataTable() {
    if (typeof window.jQuery === 'undefined' || typeof window.jQuery.fn.DataTable === 'undefined') {
        console.info('DataTables not available — showing a plain table (search/sort/paging skipped).');
        return;
    }

    window.jQuery('#recordsTable').DataTable({
        dom: "<'row mb-3'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>>" +
            "<'row'<'col-sm-12'tr>>" +
            "<'row mt-3'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
        paging: true,
        searching: true,
        info: true,
        pageLength: 10,
        language: { search: 'Search:', searchPlaceholder: '' }
    });
}