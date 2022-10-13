return function(o, ...)
    return js.new(o, table.unpack({...}))
end