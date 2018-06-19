/* global marked */
(function() {
  //On document load
  $(function() {
    $.get('PATCH_NOTES.md', function($$data) {
      var _doc = marked($$data);

      var _patchNotes = [];

      //Split on lines
      _doc.split('\n').forEach(function($$line) {
        var __line = $.parseHTML($$line);

        //We have an h1 tag?
        if(__line.length === 1 && __line[0].tagName == 'H1') {
          _patchNotes.push({
            'header': __line[0],
            'body': []
          });
        }
        else { //Must be a <p> or a collection of <p>
          var _itm = _patchNotes[_patchNotes.length - 1];
          _itm['body'] = _itm['body'].concat(__line);
        }
      });

      //Panel where we will push panels
      var _panelsItem = $('.patch-notes-panels');

      //Empty ot
      _panelsItem.empty();

      //Foreach patch note
      _patchNotes.forEach(function($$patchNote, $index) {

        //We are on first
        if($index == 0) {
          var _panelItem = $('.first-patch-notes');

          _panelItem.empty().append([
              $('<div>')
                  .addClass('panel-heading')
                  .append($('<strong>').text($($$patchNote['header']).text())),
              $('<div>')
                  .addClass('panel-body')
                  .html($$patchNote['body'])
          ]);

          _processPanelOutput(_panelItem);
        }
        else {

          var _panelItem = $('<div>')
            .addClass('panel panel-default')
            .append(
            $('<div>')
              .addClass('panel-heading')
              .append($('<strong>').text($($$patchNote['header']).text())),
            $('<div>')
              .addClass('panel-body')
              .html($$patchNote['body'])
          );

          _panelsItem.append(_processPanelOutput(_panelItem));
        }
      });
    })
  });

  //Processed output panel
  function _processPanelOutput(panel) {

    var _versionText = panel.find('.panel-heading strong').text();
    panel.attr('id', window.encodeURIComponent(_versionText));

    $('.panel-versions-links .list-group').append(
      $('<a>')
        .attr('href', '#' + window.encodeURIComponent(_versionText))
        .addClass('list-group-item')
        .append($('<strong>').text(_versionText))
    );

    panel.find('img').addClass('img-responsive');


    return panel;
  }
})();