(setq compilation-environment '("TERM=eterm"))

(defun my/advice-compilation-filter (f proc string)
  (funcall f proc (xterm-color-filter string)))

(advice-add 'compilation-filter :around #'my/advice-compilation-filter)

(npm-mode-npm-run)


(defun my/npm-mode-npm-run (script &optional comint)
  "Run the 'npm run' command on a project script."
  (interactive
    (npm-mode--exec-process (format "npm run %s" script) comint))
  )

(my/npm-mode-npm-run "start" (ansi-term))
