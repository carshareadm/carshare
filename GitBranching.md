# Git Branching Strategy
##### _the short version_
see the document in the shared group Project Documentation folder for a much more in depth breakdown, and explanation of why we are going to all this trouble

## git strategy
* **starting work on a new trello task**
  * git checkout master
  * git pull
  * git checkout -b name/feature-description  ie paul/db-models
* **saving or committing your work**
  * git add -A
  * git commit -am "a message about your work"
    (you won't be able to commit if tests are failing or there are lint errors, pay attention to messages in the console or terminal window)
* **push work to github**
  * git push (if this is the first time you are pushing this branch to github, you will need to use _git push -u origin name/feature-description_)
* **finished working on feature, now i want to get it into master**
  * from your name/feature-description branch
  * git checkout -b feature/feature-description
  * git rebase -i hash_commit_before_your_first_commit_in_branch (you can see it in github branch history it will be in this format: f4a0da6)
  * git fetch
  * git rebase origin/master
  * git push -u origin feature/feature-description
* **create pull request in github**
  * click pull request tab
  * click New Pull Request button
  * choose your feature/feature-description branch from the 'compare: master' dropdown (it should be the second one)
  * click Create pull request button
  * someone will review your request, and merge it to master
  * in the meantime, pick a new trello task, and start from the top of these instructions
