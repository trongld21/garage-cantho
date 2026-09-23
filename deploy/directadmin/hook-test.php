<?php
declare(strict_types=1);
define('TAYDO_DEPLOY_HOOK_LIBRARY', true);
require __DIR__.'/deploy-hook.php';
$errors=[];
if(!safe_relative_path('_next/static/app-1.js'))$errors[]='valid static path rejected';
if(!safe_relative_path('cars/_/__next.cars/$d$slug/__PAGE__.txt'))$errors[]='Next dynamic path rejected';
foreach(['../.env','/etc/passwd','api/../x','a b'] as $path)if(safe_relative_path($path))$errors[]='unsafe path accepted: '.$path;
if(TAYDO_CHUNK_LIMIT>6*1024*1024||TAYDO_MAX_CHUNKS>100)$errors[]='upload limits too broad';
$source=(string)file_get_contents(__DIR__.'/deploy-hook.php');
foreach(['hash_hmac','hash_file','PharData','migrate','frontend-manifest.json'] as $contract)if(!str_contains($source,$contract))$errors[]='missing '.$contract;
if($errors){fwrite(STDERR,implode(PHP_EOL,$errors).PHP_EOL);exit(1);}echo "HTTPS deploy hook tests: OK\n";
