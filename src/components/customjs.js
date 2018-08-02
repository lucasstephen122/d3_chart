export function customjs() {
  // jQuery(".toggle-icon").removeClass('active');
  jQuery(".grid-list-btn").on("click", function(){
            $(".grid-list-btn").removeClass("active");
            $(this).addClass("active");
            if($(this).hasClass("grid-btn")){
                $(".tab-content").removeClass("list-view");
                $(".tab-content").addClass("grid-view");
            }
            else{
                $(".tab-content").removeClass("grid-view");
                $(".tab-content").addClass("list-view");
            }
    });  
  jQuery("#expand").on("click", function(){
        jQuery('#myModal').modal('show');
    });

  
}