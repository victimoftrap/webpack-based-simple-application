'use strict';

import './styles/main.scss';

import indexTemplate from './pages/index/index.hbs';
import taskTemplate from './partials/task/task.hbs';
import codeTemplate from './partials/task/includes/code/code.hbs';
import data from './data/data';

import OperationExecutor from './operationExecutor';

const operationExecutor = new OperationExecutor();

document.addEventListener("DOMContentLoaded", function() {
  const root = $('#root');
  root.append(indexTemplate());

  const content = $('.content');
  data.taskList.forEach(task => {
    let arg = task.code;
    task.code = JSON.stringify(task.code, undefined, 2).split('\n');
    content.append(taskTemplate(task));

    $(`.button_${task.id}`).click(onButtonClick.bind(this, task.id, arg));
  });
});

const onButtonClick = (id, arg) => {
  const task = $(`.task_${id}`);
  task.children('.task__code_answer').remove();
  task.append(
    codeTemplate({
      code: JSON.stringify(operationExecutor.execute(id, arg), undefined, 2).split('\n'),
      mode: 'answer'
    })
  );
};
