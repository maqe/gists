<?php

/* The following is a function for pretty printing out SQL statements
from the query builder. This can be useful in situations where you may
want to output the SQL to play around with it in the console */

function ddsql(Illuminate\Database\Query\Builder $builder)
{
    $sql = $builder->toSql();
    $sql = str_replace('?', '%s', $sql);

    $bindings = $builder->getBindings();
    foreach($bindings as &$binding)
    {
        if (empty($binding))
            $binding = "''";

        // not the best but words for like statements
        if (stristr($binding, '%'))
            $binding = "'".$binding."'";
    }

    $sql = vsprintf($sql, $bindings);

    $sql = sql_pretty_print($sql);
    echo '<textarea cols="200" rows="50">'.$sql.'</textarea>';
    exit;
}

/* This function takes the SQL and adds formatting so that it is
easier to read */
function sql_pretty_print($sql)
{
    $commands = [
        'select' => [
            'res'=> "%s\n\t",
            'sub'=> [','=>"%s\n\t"],
        ],
        'from' => [
            'res'=> "\n%s\n\t",
        ],
        'inner' => [
            'res' => "\n%s",
        ],
        'join' => [
            'res'=> "%s\n\t",
        ],
        'where' => [
            'res'=> "\n%s\n\t",
            'sub'=> ['and'=>"\n\t %s"],
        ],
        'order' => [
            'res'=> "\n%s",
        ],
        'group' => [
            'res'=> "\n%s",
        ],
        'by' => [
            'res'=> "%s\n\t",
            'sub'=> [','=>"%s\n\t"],
        ],
        'limit' => [
            'res'=> "%s\n\t",
        ],
    ];

    $current_submatch = [];
    $words = explode(' ', $sql);
    foreach($words as $k=>&$word)
    {
        if (empty($word))
        {
            unset($words[$k]);
            continue;
        }

        foreach($commands as $command=>$opt)
        {
            if (preg_match('/\b'.$command.'\b/i', $word))
            {
                $word = sprintf($opt['res'], $word);

                if (empty($opt['sub']))
                    $opt['sub'] = [];

                $current_submatch = $opt['sub'];
            }
        }

        foreach($current_submatch as $submatch=>$input)
        {
            if (stristr($word, $submatch))
            {
                $word = sprintf($input, $word);
            }
        }
    }

    $sql = implode(' ', $words);
    $sql = str_ireplace("\t", '   ', $sql);
    return $sql;
}