<?php
declare(strict_types=1);
echo 'APP_KEY=base64:'.base64_encode(random_bytes(32)).PHP_EOL;
echo 'DEPLOY_HOOK_KEY='.bin2hex(random_bytes(32)).PHP_EOL;
